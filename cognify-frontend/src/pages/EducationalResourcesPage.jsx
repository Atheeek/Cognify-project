import React from 'react';
// To use icons, you would:
// 1. npm install react-icons
// 2. Uncomment the import below and the icon components in the JSX
import { FiBook, FiTool, FiExternalLink, FiHelpCircle } from 'react-icons/fi';

const EducationalResourcesPage = () => {
  const today = new Date();
  const lastUpdatedDate = `${today.toLocaleString('default', { month: 'long' })} ${today.getDate()}, ${today.getFullYear()}`;

  // Helper component for resource list items for consistency
  const ResourceListItem = ({ title, link, linkText = "[Read More]", isExternal = false, description }) => (
    <li className="py-3 transition-colors duration-200 ease-in-out hover:bg-light-accent rounded-md group px-3"> {/* Using theme color for hover */}
      <strong className="font-semibold text-dark-text group-hover:text-brand-blue">{title}</strong>
      {description && <p className="text-sm text-medium-text mt-1 leading-snug">{description}</p>}
      {link && (
        <a
          href={link}
          className="text-brand-blue hover:underline ml-0 sm:ml-2 font-medium group-hover:text-brand-purple block sm:inline mt-1 sm:mt-0" // Responsive link layout
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {linkText} {isExternal && <FiExternalLink className="inline ml-1 mb-px" />}
        </a>
      )}
    </li>
  );

  const FAQItem = ({ question, answer }) => (
    <div className="py-4">
      <h3 className="font-semibold text-lg text-brand-blue mb-1.5">
        <FiHelpCircle className="inline mr-2 text-brand-purple" />
        Q: {question}
      </h3>
      <p className="text-medium-text ml-0 sm:ml-6 leading-relaxed"> {/* Adjusted margin for mobile */}
        A: {answer}
      </p>
    </div>
  );

  return (
    // font-sans will apply 'Inter' (or your chosen sans-serif font from CSS)
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-10">

        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-blue mb-3 text-center tracking-tight">
          Educational Resources
        </h1>
        <p className="text-light-text text-xs text-center mb-8">Last Updated: {lastUpdatedDate}</p>

        <p className="text-medium-text text-lg mb-12 text-center leading-relaxed max-w-3xl mx-auto">
          Welcome to our resource hub! Find curated articles, practical guides, and links to supportive organizations designed to empower parents and educators on the journey with children experiencing neurodevelopmental differences such as Autism Spectrum Disorder (ASD), ADHD, Dyslexia, Dyscalculia, and others.
        </p>

        <div className="space-y-16">

          {/* Section: Articles & Research */}
          <div>
            <h2 className="text-3xl font-bold text-brand-purple mb-6 border-b-2 border-purple-100 pb-3 flex items-center">
              <FiBook className="mr-3 text-xl" />
              Articles & Research
            </h2>
            <ul className="list-none sm:list-disc sm:list-inside space-y-5 text-dark-text text-base">
              <ResourceListItem
                title="Understanding Autism Spectrum Disorder"
                link="https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd"
                isExternal={true}
                linkText="[Visit NIMH]"
                description="Comprehensive overview of ASD, including signs, symptoms, diagnosis, and treatment options from the National Institute of Mental Health."
              />
              <ResourceListItem
                title="ADHD in the Classroom: Helping Children Succeed in School"
                link="https://www.cdc.gov/adhd/treatment/classroom.html"
                isExternal={true}
                linkText="[Visit CDC]"
                description="Evidence-based strategies for educators to support students with ADHD, provided by the Centers for Disease Control and Prevention."
              />
              <ResourceListItem
                title="The Importance of Early Intervention for Children with Developmental Delays"
                link="https://www.cdc.gov/ncbddd/actearly/whyActEarly.html"
                isExternal={true}
                linkText="[Visit CDC]"
                description="Information from the CDC on why early intervention is critical for children showing signs of developmental delays."
              />
              <ResourceListItem
                title="Dyslexia: What It Is, Symptoms, Causes, and Treatments"
                link="https://www.understood.org/en/articles/what-is-dyslexia"
                isExternal={true}
                linkText="[Visit Understood.org]"
                description="A clear explanation of dyslexia, its common signs, and approaches to support, from Understood.org."
              />
              <ResourceListItem
                title="Sensory Processing Issues Explained"
                link="https://childmind.org/article/sensory-processing-issues-explained/"
                isExternal={true}
                linkText="[Visit Child Mind Institute]"
                description="An in-depth look at sensory processing challenges and how they affect children, from the Child Mind Institute."
              />
            </ul>
            {/* Optional "View All" link
            <p className="mt-8 text-right">
              <a href="/articles-archive" className="text-brand-blue hover:underline font-semibold">
                View all Articles & Research &rarr;
              </a>
            </p>
            */}
          </div>

          {/* Section: Practical Guides & Toolkits */}
          <div>
            <h2 className="text-3xl font-bold text-brand-purple mb-6 border-b-2 border-purple-100 pb-3 flex items-center">
              <FiTool className="mr-3 text-xl" />
              Practical Guides & Toolkits
            </h2>
            <ul className="list-none sm:list-disc sm:list-inside space-y-5 text-dark-text text-base">
              <ResourceListItem
                title="Visual Supports and Autism: A Guide for Parents"
                link="https://www.autismspeaks.org/tool-kit/visual-supports-and-autism-spectrum-disorder"
                linkText="[View Guide on Autism Speaks]"
                isExternal={true}
                description="A toolkit from Autism Speaks on creating and using visual supports, including schedules, for individuals with ASD."
              />
              <ResourceListItem
                title="Behavioral Treatments for Kids With ADHD"
                link="https://childmind.org/article/behavioral-treatments-kids-adhd/"
                linkText="[View Guide on Child Mind Institute]"
                isExternal={true}
                description="Guidance on behavioral strategies and parent training for managing ADHD symptoms from the Child Mind Institute."
              />
              <ResourceListItem
                title="IEP vs. 504 Plan: What’s the Difference?"
                link="https://www.understood.org/en/articles/iep-vs-504-plan-whats-the-difference"
                linkText="[View Guide on Understood.org]"
                isExternal={true}
                description="A clear comparison of IEPs and 504 Plans to help parents navigate special education services, by Understood.org."
              />
              <ResourceListItem
                title="Classroom Accommodations for Dyscalculia"
                link="https://www.additudemag.com/slideshows/dyscalculia-accommodations-for-school/"
                linkText="[View Guide on ADDitude Mag]"
                isExternal={true}
                description="Practical classroom accommodations and strategies for students with dyscalculia from ADDitude Magazine."
              />
              <ResourceListItem
                title="Augmentative and Alternative Communication (AAC)"
                link="https://www.asha.org/public/speech/disorders/aac/"
                linkText="[Learn on ASHA.org]"
                isExternal={true}
                description="An introduction to AAC, who it can help, and different types of AAC systems, from the American Speech-Language-Hearing Association (ASHA)."
              />
            </ul>
             {/* Optional "View All" link
            <p className="mt-8 text-right">
              <a href="/guides-archive" className="text-brand-blue hover:underline font-semibold">
                View all Guides & Toolkits &rarr;
              </a>
            </p>
            */}
          </div>

          {/* Section: External Organizations & Support */}
          <div>
            <h2 className="text-3xl font-bold text-brand-purple mb-6 border-b-2 border-purple-100 pb-3 flex items-center">
              <FiExternalLink className="mr-3 text-xl" />
               External Organizations & Support
            </h2>
            <ul className="list-none sm:list-disc sm:list-inside space-y-5 text-dark-text text-base">
              <ResourceListItem
                title="Autism Speaks"
                description="Leading autism science and advocacy organization, dedicated to funding research, increasing awareness, and providing resources."
                link="https://www.autismspeaks.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
              <ResourceListItem
                title="CHADD (Children and Adults with Attention-Deficit/Hyperactivity Disorder)"
                description="National resource for information, education, and advocacy on ADHD for individuals, parents, educators, and professionals."
                link="https://chadd.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
              <ResourceListItem
                title="International Dyslexia Association (IDA)"
                description="Provides resources, information, and support for individuals with dyslexia, their families, and educators."
                link="https://dyslexiaida.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
              <ResourceListItem
                title="National Center for Learning Disabilities (NCLD)"
                description="Works to improve the lives of the 1 in 5 children and adults nationwide with learning and attention issues."
                link="https://www.ncld.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
              <ResourceListItem
                title="The Arc"
                description="Promotes and protects the human rights of people with intellectual and developmental disabilities (IDD) and supports their full inclusion."
                link="https://thearc.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
              <ResourceListItem
                title="Understood.org"
                description="Offers resources and support for people with learning and thinking differences, like dyslexia and ADHD, and their families."
                link="https://www.understood.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
              <ResourceListItem
                title="Child Mind Institute"
                description="Independent nonprofit dedicated to transforming the lives of children and families struggling with mental health and learning disorders."
                link="https://childmind.org/"
                linkText="[Visit Website]"
                isExternal={true}
              />
               <ResourceListItem
                title="American Speech-Language-Hearing Association (ASHA)"
                description="Professional association for audiologists, speech-language pathologists, and speech, language, and hearing scientists. Offers public resources on communication disorders."
                link="https://www.asha.org/public/"
                linkText="[Visit Public Resources]"
                isExternal={true}
              />
            </ul>
          </div>

          {/* Section: Frequently Asked Questions (FAQs) */}
          <div>
            <h2 className="text-3xl font-bold text-brand-purple mb-6 border-b-2 border-purple-100 pb-3 flex items-center">
              <FiHelpCircle className="mr-3 text-xl" />
               Frequently Asked Questions
            </h2>
            <div className="space-y-6 text-dark-text text-base">
              <FAQItem
                question="What is the difference between a developmental delay and a developmental disability?"
                answer="A developmental delay means a child is lagging behind peers in one or more areas (like speech, motor skills, or learning). It can sometimes be temporary. A developmental disability is a chronic condition due to a physical or mental impairment that typically lasts throughout a person's lifetime and significantly impacts daily functioning (e.g., Autism Spectrum Disorder, Down syndrome). Early intervention is key for both, but the long-term prognosis and support needs often differ."
              />
              <FAQItem
                question="How can I best talk to my child about their neurodevelopmental diagnosis?"
                answer="Use clear, simple, and age-appropriate language. Focus on their strengths alongside challenges, explaining that their brain works differently, not 'less than.' Reassure them of your love and unwavering support. Frame the diagnosis as a way to understand themselves better and access helpful tools. Many organizations (like those listed above) offer guides on this topic tailored to specific conditions."
              />
              <FAQItem
                question="What are effective strategies for managing meltdowns or challenging behaviors?"
                answer="Key strategies include: 1. Identifying triggers and functions of the behavior (what happens before and what the child gains). 2. Maintaining predictable routines and environments. 3. Using visual supports. 4. Teaching coping skills and emotional regulation. 5. Consistently applying positive reinforcement for desired behaviors and planned ignoring (when appropriate) for minor challenging behaviors. Consulting a behavior specialist or psychologist can provide personalized strategies."
              />
              <FAQItem
                question="How can I effectively advocate for my child's educational needs at school?"
                answer="Understand your child's rights under laws like IDEA (for IEPs) or Section 504. Keep detailed records of communications, evaluations, and progress. Build a collaborative relationship with the school team. Be clear about your child's needs and provide documentation. Prepare for meetings by writing down your points and desired outcomes. Don't hesitate to ask questions or seek support from parent advocacy groups or educational advocates."
              />
              <FAQItem
                question="Where can I find reliable local support groups or qualified professionals?"
                answer="Start with your child's pediatrician or specialist for recommendations. National organizations listed on this page often have directories of local chapters or providers. Your local school district's special education department can be a resource. Websites like Psychology Today also have searchable databases of therapists. For support groups, search online for local parent groups related to your child's specific needs."
              />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-light-text text-sm">
          <p className="italic leading-relaxed">
            The information provided on this page is for general informational purposes only and does not constitute medical, legal, or professional advice. Always seek the advice of your physician, therapist, educator, or other qualified professional with any questions you may have regarding a medical condition, educational strategy, or legal right. The links to external websites are provided as a convenience and for informational purposes only; they do not constitute an endorsement or an approval by us of any of the products, services, or opinions of the corporation, organization, or individual. We bear no responsibility for the accuracy, legality, or content of the external site or for that of subsequent links.
          </p>
          <p className="mt-4">&copy; {today.getFullYear()} Cognify. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default EducationalResourcesPage;