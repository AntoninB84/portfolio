import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col gap-[32px] items-center p-8">
            <div className="w-6/10 flex flex-col  items-center gap-8 mb-[100px]">
                <p>This website is more than just a portfolio—it's also a personal project I developed while <span className="font-bold">teaching myself Next.js</span>. I wanted to build something that would <span className="font-bold">showcase both my skills and my ability to learn and apply new technologies</span>. </p>
                <p>The site has two parts: a public-facing section where you can learn more about me and explore the projects I've worked on, and a <span className="font-bold">private admin dashboard</span> that functions as a lightweight CMS. This back-office allows me to manage the content of the “Projects” page dynamically.</p>
                <p>While the site is fully functional, I see it as a <span className="font-bold">work in progress</span>. There are still areas I plan to improve, whether in terms of code structure, performance optimization, or development best practices. That's part of the reason why I built it: to <span className="font-bold">experiment, learn, and refine</span>. The full source code is <a className="text-blue-500 hover:text-blue-800" href="https://github.com/AntoninB84/portfolio">available on GitHub</a>, so feel free to explore how it's built and follow its evolution.</p>
                <div className="h-[200px] w-[200px] relative rounded-full bg-accent">
                    <Image
                        src={'/profil.jpg'}
                        alt="Photo"
                        fill
                        className="rounded-full"
                    />
                </div>
                <p>My name is <span className="font-bold">Antonin Billot</span>, I'm a French software developer with <span className="font-bold">3-4 years of professional experience</span> in web and mobile application development.</p> 
                <p> I started my career at <span className="font-bold">Bleu122</span>, a small French company specializing in building custom digital solutions for clients. There, I had the opportunity to work on a wide range of projects, helping me grow both technically and professionally.</p>
                <p>My journey into development began with a strong desire to <span className="font-bold">solve real-world problems through practical solutions</span>. One of my first personal projects was an app to manage my ideas and personal goals—complete with recurring reminders and habit tracking features. I also built a prototype for a family book cataloging app, designed to scan barcodes and automatically fill in metadata using external APIs.</p>
                <p>In my early academic years, I learned the foundations of web development—HTML, CSS, JavaScript, and PHP. To bring my personal ideas to life, I <span className="font-bold">self-taught Java and Kotlin</span> for mobile development, and later added <span className="font-bold">React and Node.js</span> for building modern web applications and APIs.</p>
                <p>This passion eventually led me to pursue a third phase of higher education, focused on mobile app development. I completed my final year as an apprentice at Bleu122, where I was offered a full-time position after graduation.</p>
                <p>During my time at Bleu122, I worked as a <span className="font-bold">fullstack developer using technologies like Grails (Groovy/Java), Vue.js, and Flutter</span>. I particularly enjoyed working on a variety of different projects, each with unique challenges and requirements—something that taught me a lot in a short time.</p>
                <p>What <span className="font-bold">motivates me the most in programming</span> is the process of moving from a problem to a fully functioning solution. There's something deeply satisfying about watching a project take shape <span className="font-bold">step by step</span>. While my experience so far has focused on delivering <span className="font-bold">functional and visually complete products</span>, I'm now looking to <span className="font-bold">deepen my expertise</span> in software quality: <i>clean code, proper development workflows (PRs, CI/CD), and testing practices (unit and functional tests)</i>.</p>
                <p>I'm passionate about building meaningful digital experiences and eager to join a team where I can continue learning, growing, and contributing to high-quality software projects.</p>

            </div>
        </main>
    );
}