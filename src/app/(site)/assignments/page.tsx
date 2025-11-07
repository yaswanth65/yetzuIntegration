import React from 'react'
import FAQSection from './components/FAQSection'
import AssignmentWorkflow from './components/WrokFlow'
import AssignmentWorkflowWithSteps from './components/AssignmentWorkflows'
import MeetTheBrains from './components/MeetTheBrains'

const page = () => {
    return (
        <div className='flex flex-col gap-4 mb-5 font-inter'>
            <MeetTheBrains />
            <AssignmentWorkflowWithSteps />
            <AssignmentWorkflow />
            <FAQSection />
        </div>
    )
}

export default page
