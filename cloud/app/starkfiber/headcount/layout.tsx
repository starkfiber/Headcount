import localFont from 'next/font/local';
import './identity.css';
const classroomFont=localFont({src:'../../../public/starkfiber/headcount/fonts/nunito.ttf',variable:'--font-headcount',display:'swap',weight:'200 1000'});
export default function HeadcountLayout({children}:{children:React.ReactNode}){return <div data-headcount className={classroomFont.variable}>{children}</div>}
