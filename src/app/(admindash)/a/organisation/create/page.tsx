"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminAPI } from '@/lib/api';

import ProgressBar from './components/ProgressBar';
import BasicInfo from './components/BasicInfo';
import AdminDetails from './components/AdminDetails';
import StudentImport from './components/StudentImport';
import AccessPermissions from './components/AccessPermissions';
import BillingDetails from './components/BillingDetails';
import ReviewCreate from './components/ReviewCreate';

const defaultPermissions = [
  { code: "webinars", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "cohorts", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "mentorship", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "certification_courses", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
  { code: "assignments", enabled: false, limit: null, usedCount: 0, accessExpiry: null },
];

const buildPermissionDefaults = () => ({
  webinars: false,
  cohorts: false,
  mentorship: false,
  certification_courses: false,
  assignments: false,
});

const normalizeNumber = (value: any) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const normalizeStudents = (students: any[] = []) =>
  students
    .map((student: any) => ({
      name: String(student?.name || student?.fullName || student?.studentName || '').trim(),
      email: String(student?.email || student?.mail || '').trim(),
      password: String(student?.password || 'Pass123!'),
      mobileNo: String(student?.mobileNo || student?.mobile || student?.phone || '').trim(),
    }))
    .filter((student) => student.name || student.email);

const normalizePermissions = (permissions: any = []) => {
  const toggles = buildPermissionDefaults();
  const limits: Record<string, number | null> = {
    webinars: null,
    cohorts: null,
    mentorship: null,
    certification_courses: null,
    assignments: null,
  };

  const list = Array.isArray(permissions)
    ? permissions
    : Array.isArray(permissions?.permissions)
      ? permissions.permissions
      : [];

  list.forEach((item: any) => {
    const code = String(item?.code || item?.permission || '').trim();
    if (!(code in toggles)) return;
    toggles[code as keyof typeof toggles] = Boolean(item?.enabled ?? item?.active ?? item?.isEnabled ?? item?.value);
    const rawLimit = item?.limit ?? item?.maxLimit ?? item?.usageLimit;
    limits[code] = rawLimit === undefined || rawLimit === null || rawLimit === '' ? null : Number(rawLimit);
  });

  return { toggles, limits };
};

const normalizeBillingData = (organization: any) => {
  const invoiceAmount = organization?.invoice?.amount ?? organization?.payment?.amount ?? organization?.basePrice ?? organization?.revenueGenerated ?? organization?.revenue;
  return {
    model: organization?.billingModel || organization?.plan || 'flat',
    pricingType: organization?.pricingType || 'fixed',
    basePrice: normalizeNumber(invoiceAmount),
    currency: organization?.currency || organization?.invoice?.currency || organization?.payment?.currency || 'USD',
    billingCycle: organization?.billingCycle || 'monthly',
    paymentMethod: organization?.payment?.paymentMethod || organization?.paymentMethod || 'credit',
  };
};

const isUuidLike = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

function CreateOrganizationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode') === 'edit' ? 'edit' : 'create';
  const organizationId = searchParams?.get('id') || searchParams?.get('organizationId') || '';
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOrganization, setIsLoadingOrganization] = useState(false);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [organizationStatus, setOrganizationStatus] = useState('active');
  const [originalOrganization, setOriginalOrganization] = useState<any>(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const NAME_REGEX = /^.{2,}$/;

  const validateStep = (step: number): string[] => {
    const errors: string[] = [];
    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.push('Organization name is required');
        else if (!NAME_REGEX.test(formData.name.trim())) errors.push('Organization name must be at least 2 characters');
        if (!formData.type) errors.push('Organization type is required');
        if (!formData.email.trim()) errors.push('Email address is required');
        else if (!EMAIL_REGEX.test(formData.email.trim())) errors.push('Enter a valid email address (e.g. name@domain.com)');
        break;
      case 2:
        if (!adminData.name.trim()) errors.push('Primary admin name is required');
        else if (!NAME_REGEX.test(adminData.name.trim())) errors.push('Admin name must be at least 2 characters');
        if (!adminData.email.trim()) errors.push('Admin email is required');
        else if (!EMAIL_REGEX.test(adminData.email.trim())) errors.push('Enter a valid admin email address');
        break;
      case 3:
        if (students.length > 0) {
          students.forEach((s, i) => {
            if (!s.name.trim()) errors.push(`Student ${i + 1}: Name is required`);
            if (!s.email.trim()) errors.push(`Student ${i + 1}: Email is required`);
            else if (!EMAIL_REGEX.test(s.email.trim())) errors.push(`Student ${i + 1}: Enter a valid email address`);
          });
        }
        break;
      case 5:
        if (!billingData.basePrice || billingData.basePrice <= 0) errors.push('Base price must be greater than 0');
        break;
    }
    return errors;
  };

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    emailDomain: '',
    location: '',
    description: '',
  });

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    roleTitle: '',
    phoneCode: '+1',
  });

  const [students, setStudents] = useState<Array<{ name: string; email: string; password: string; mobileNo: string }>>([]);
  const [importMethod, setImportMethod] = useState<'manual' | 'csv'>('manual');

  const [permissions, setPermissions] = useState(defaultPermissions);
  const [permissionToggles, setPermissionToggles] = useState({
    webinars: false,
    cohorts: false,
    mentorship: false,
    certification_courses: false,
    assignments: false,
  });
  const [permissionLimits, setPermissionLimits] = useState<Record<string, number | null>>({
    webinars: null,
    cohorts: null,
    mentorship: null,
    certification_courses: null,
    assignments: null,
  });

  const [billingData, setBillingData] = useState({
    model: 'flat',
    pricingType: 'fixed',
    basePrice: 50000,
    currency: 'USD',
    billingCycle: 'monthly',
    paymentMethod: 'credit',
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceId: '',
    amount: 0,
    currency: 'USD',
    invoiceDate: '',
    paymentDate: '',
    paymentMethod: '',
    billingCycle: 'monthly',
    planType: '',
    paymentStatus: 'pending',
    nextBillingDate: '',
  });

  useEffect(() => {
    if (mode !== 'edit' || !organizationId || !isUuidLike(organizationId)) return;

    let mounted = true;

    const loadOrganization = async () => {
      try {
        setIsLoadingOrganization(true);
        const response = await AdminAPI.getOrganization(organizationId);
        const org = response?.data?.organization || response?.organization || response?.data || response;
        if (!mounted) return;

        setOriginalOrganization(org || null);
        setOrganizationStatus(String(org?.status || 'active').toLowerCase());
        setFormData({
          name: String(org?.name || org?.organizationName || org?.title || '').trim(),
          type: String(org?.type || org?.organizationType || '').trim(),
          email: String(org?.email || org?.adminEmail || '').trim(),
          emailDomain: String(org?.emailDomain || '').trim(),
          location: String(org?.location || org?.city || org?.address || '').trim(),
          description: String(org?.description || org?.about || '').trim(),
        });
        setAdminData({
          name: String(org?.primaryContactName || org?.adminName || org?.contactName || '').trim(),
          email: String(org?.adminEmail || org?.contactEmail || org?.email || '').trim(),
          mobileNo: String(org?.mobileNo || org?.phone || org?.contactPhone || '').trim(),
          roleTitle: String(org?.roleTitle || org?.adminRole || 'owner').trim(),
          phoneCode: String(org?.phoneCode || '+1'),
        });

        const loadedStudents = normalizeStudents(org?.students || org?.studentList || org?.members || []);
        setStudents(loadedStudents);
        setImportMethod(loadedStudents.length > 0 ? 'manual' : 'manual');

        const permissionState = normalizePermissions(org?.accessPermissions || org?.permissions);
        setPermissionToggles(permissionState.toggles);
        setPermissionLimits(permissionState.limits);

        setBillingData(normalizeBillingData(org));
        setInvoiceData({
          invoiceId: String(org?.invoice?.invoiceId || org?.invoice?.id || org?.invoiceId || '').trim(),
          amount: normalizeNumber(org?.invoice?.amount || org?.payment?.amount || org?.revenueGenerated || org?.revenue),
          currency: String(org?.invoice?.currency || org?.payment?.currency || 'USD'),
          invoiceDate: String(org?.invoice?.invoiceDate || org?.invoice?.issueDate || org?.createdAt || '').trim(),
          paymentDate: String(org?.payment?.paymentDate || org?.invoice?.paymentDate || '').trim(),
          paymentMethod: String(org?.payment?.paymentMethod || org?.paymentMethod || 'credit'),
          billingCycle: String(org?.billingCycle || 'monthly'),
          planType: String(org?.invoice?.planType || org?.planType || 'basic'),
          paymentStatus: String(org?.invoice?.paymentStatus || org?.payment?.paymentStatus || 'pending'),
          nextBillingDate: String(org?.invoice?.nextBillingDate || org?.nextBillingDate || '').trim(),
        });
      } catch (error) {
        console.error('Failed to fetch organization for editing:', error);
        alert('We could not load this organization for editing. Please try again.');
      } finally {
        if (mounted) setIsLoadingOrganization(false);
      }
    };

    loadOrganization();

    return () => {
      mounted = false;
    };
  }, [mode, organizationId]);

  const totalSteps = 6;

  const updateFormData = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors([]);
    if (currentStep < totalSteps) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    setStepErrors([]);
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BasicInfo formData={formData} onChange={updateFormData} errors={stepErrors} />;
      case 2: return <AdminDetails data={adminData} onChange={setAdminData} errors={stepErrors} />;
      case 3: return <StudentImport method={importMethod} onMethodChange={setImportMethod} students={students} onStudentsChange={setStudents} errors={stepErrors} />;
      case 4: return <AccessPermissions permissions={permissionToggles} limits={permissionLimits} onPermissionsChange={(p) => setPermissionToggles(p as any)} onLimitsChange={(l) => setPermissionLimits(l as any)} errors={stepErrors} />;
      case 5: return <BillingDetails data={billingData} onChange={setBillingData} errors={stepErrors} />;
      case 6: return <ReviewCreate
        formData={formData}
        adminData={adminData}
        students={students}
        importMethod={importMethod}
        permissions={permissionToggles}
        billingData={billingData}
        errors={stepErrors}
      />;
      default: return <BasicInfo formData={formData} onChange={updateFormData} />;
    }
  };

  const buildPermissionsPayload = () => {
    return defaultPermissions.map((p) => ({
      ...p,
      enabled: permissionToggles[p.code as keyof typeof permissionToggles] || false,
      limit: permissionLimits[p.code as keyof typeof permissionLimits] || null,
    }));
  };

  const buildStudentPayload = () => {
    if (students.length > 0) {
      return students.map(s => ({
        name: s.name.trim(),
        email: s.email.trim(),
        password: s.password || 'Pass123!',
        ...(s.mobileNo.trim() ? { mobileNo: s.mobileNo.trim() } : {}),
      }));
    }

    return mode === 'create'
      ? [{ name: 'Demo Student', email: 'demo@org.local', password: 'Pass123!' }]
      : [];
  };

  const buildOrganizationPayload = () => ({
    name: formData.name.trim(),
    organizationName: formData.name.trim(),
    type: formData.type,
    email: formData.email.trim(),
    status: organizationStatus || String(originalOrganization?.status || 'active').toLowerCase(),
    billingCycle: billingData.billingCycle,
    primaryContactName: adminData.name.trim() || formData.name.trim(),
    adminEmail: adminData.email.trim() || formData.email.trim(),
    phoneCode: adminData.phoneCode || '+1',
    mobileNo: adminData.mobileNo || '',
    roleTitle: adminData.roleTitle || 'owner',
    accessPlan: originalOrganization?.accessPlan || 'basic',
    location: formData.location || '',
    description: formData.description || '',
    students: buildStudentPayload(),
    accessPermissions: buildPermissionsPayload(),
    invoice: {
      amount: billingData.basePrice || 0,
      currency: billingData.currency || 'USD',
      billingCycle: billingData.billingCycle,
      paymentStatus: invoiceData.paymentStatus || 'pending',
      invoiceId: invoiceData.invoiceId || undefined,
      paymentDate: invoiceData.paymentDate || undefined,
      nextBillingDate: invoiceData.nextBillingDate || undefined,
      planType: invoiceData.planType || undefined,
      paymentMethod: billingData.paymentMethod || invoiceData.paymentMethod || 'credit',
    },
    payment: {
      amount: billingData.basePrice || 0,
      currency: billingData.currency || 'USD',
      paymentMethod: billingData.paymentMethod || invoiceData.paymentMethod || 'credit',
      paymentStatus: invoiceData.paymentStatus || 'pending',
      paymentDate: invoiceData.paymentDate || undefined,
      transactionRef: invoiceData.invoiceId || undefined,
      nextBillingDate: invoiceData.nextBillingDate || undefined,
    },
  });

  const handleSubmitOrganization = async () => {
    try {
      setIsSubmitting(true);

      const payload = buildOrganizationPayload();

      if (mode === 'edit') {
        if (!organizationId || !isUuidLike(organizationId)) {
          throw new Error('Missing organization ID for update.');
        }

        await AdminAPI.updateOrganization(organizationId, payload);
        await AdminAPI.updateAccessPermissions(organizationId, payload.accessPermissions);
        router.push(`/a/organisation/${organizationId}`);
      } else {
        await AdminAPI.createOrganization(payload);
        router.push('/a/organisation/all');
      }
    } catch (error: any) {
      console.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} organization:`, error);
      alert(error?.message || `Failed to ${mode === 'edit' ? 'update' : 'create'} organization. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col relative pb-24">
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
        <Link href="/a/organisation" className="flex items-center gap-2 text-slate-800 font-bold hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-lg">{mode === 'edit' ? 'Edit Organisation' : 'Create Organisation'}</span>
        </Link>
        {mode === 'edit' && organizationId && (
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Editing {organizationId}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white border-b border-gray-100">
        <ProgressBar currentStep={currentStep} />
      </div>

      {/* Form Content Wrapper */}
      <div className="flex-1 w-full bg-[#fcfcfc] py-8 px-4">
        {mode === 'edit' && isLoadingOrganization ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Loading organization details...</p>
            <p className="mt-2 text-sm text-gray-500">We’re pulling the current data so you can update it safely.</p>
          </div>
        ) : (
          renderStep()
        )}
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 right-0 md:left-[260px] left-0 bg-white border-t border-gray-100 p-4 md:px-8 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <div>
            {currentStep > 1 && (
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
            
            {currentStep === totalSteps ? (
              <button onClick={handleSubmitOrganization} disabled={isSubmitting || isLoadingOrganization} className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60">
                {isSubmitting ? (mode === 'edit' ? 'Updating...' : 'Creating...') : (mode === 'edit' ? 'Update Organization' : 'Create Organization')}
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={isLoadingOrganization}
                className="px-8 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateOrganizationPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading organization form...</div>}>
      <CreateOrganizationPageContent />
    </Suspense>
  );
}
