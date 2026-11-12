import type {Metadata} from 'next';
import Script from 'next/script';
import {markup} from './markup';
import './headcount.css';
import './launch.css';
export const metadata:Metadata={title:'Headcount — Free classroom quizzes, attendance & learning check-ins',description:'Take attendance, run quick classroom quizzes and keep your records. Free teacher accounts, student session codes and an on-screen quiz experience. By Stark Fiber Enterprise.',alternates:{canonical:'https://starkfiber.my/headcount'},openGraph:{title:'Headcount — More teaching. Less keeping track.',description:'Attendance and quick quizzes, together. A free classroom workspace by Stark Fiber Enterprise.',url:'https://starkfiber.my/headcount',images:[{url:'https://starkfiber.my/starkfiber/headcount/classroom-club.webp',width:1536,height:1024,alt:'Headcount Classroom Club'}]}};
export default function Page(){return <><div dangerouslySetInnerHTML={{__html:markup}}/><Script type="module" src="/starkfiber/headcount/app.mjs?v=2" strategy="afterInteractive"/></>;}
