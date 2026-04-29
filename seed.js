

const BASE_URL = 'https://productionyetzuapi.yetzu.com';

async function login(email, password) {
  const res = await fetch(BASE_URL + '/api/identityapi/v1/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if(!res.ok) throw new Error('Login failed for ' + email + ': ' + JSON.stringify(data));
  const uid = data.userProfileData?.user_id || data.userData?.user?.id || data.userData?.id;
  return {
    token: data.userData.jwtToken,
    userId: uid
  };
}

async function createSession(adminToken, educatorId, sessionData) {
  console.log('Creating session:', sessionData.title);
  const formData = new FormData();
  for(let key in sessionData) {
      formData.append(key, sessionData[key]);
  }
  formData.append('educatorId', educatorId);
  formData.append('status', 'upcoming'); // Crucial for visibility!
  
  const res = await fetch(BASE_URL + '/api/admin/sessions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + adminToken
    },
    body: formData
  });
  const data = await res.json();
  if (!res.ok) console.error('Create session failed:', data);
  return data.data?.id || data.session?.id || data.id || data._id || data.session?._id;
}

async function main() {
  try {
    const admin = await login('yetzuadmin@yetzu.com', 'YetzuAdmin@123');
    const educator = await login('testeducator@yetzu.com', 'SecurePass@123');
    
    const sessionsToSeed = [
        {
            title: 'Advanced AI Architectures ' + Math.floor(Math.random()*100),
            description: 'Dive deep into modern LLM design, RAG implementation, and scalable AI infrastructure.',
            sessionType: 'Mentorship',
            category: 'technology',
            date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            startTime: '10:00',
            endTime: '12:00',
            capacity: '20',
            pricingType: 'paid',
            price: '3499'
        },
        {
            title: 'Fullstack React & Next.js Bootcamp ' + Math.floor(Math.random()*100),
            description: 'An intensive bootcamp covering everything from React basics to SSR, ISR, and API routes in Next.js.',
            sessionType: 'Webinar',
            category: 'technology',
            date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
            startTime: '14:00',
            endTime: '18:00',
            capacity: '100',
            pricingType: 'paid',
            price: '1499'
        },
        {
            title: '1:1 Career Mentorship & Resume Review ' + Math.floor(Math.random()*100),
            description: 'A private session to review your resume, discuss career goals, and prepare for technical interviews.',
            sessionType: '1:1',
            category: 'career',
            date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
            startTime: '16:00',
            endTime: '17:00',
            capacity: '1',
            pricingType: 'free',
            price: '0'
        }
    ];

    for (let s of sessionsToSeed) {
        const sessionId = await createSession(admin.token, educator.userId, s);
        console.log('Session successfully created:', sessionId);
    }
    
    console.log('Seeding complete! Admin and Educator linked.');
  } catch (err) {
    console.error('Error during seeding:', err.message);
  }
}

main();
