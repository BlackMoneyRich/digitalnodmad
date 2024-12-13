import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats to your purchase! Please check your email for futher
              instructions.
            </p>

            <Button className="mt-5 sm:mt-6 w-full" asChild>
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}


// 'use client';

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Check, Download } from "lucide-react";
// import Link from "next/link";
// import { useSearchParams } from 'next/navigation';

// export default function SuccessRoute() {
//   const searchParams = useSearchParams();
//   const downloadUrl = searchParams.get('downloadUrl');

//   return (
//     <section className="w-full min-h-[80vh] flex items-center justify-center">
//       <Card className="w-[350px]">
//         <div className="p-6">
//           <div className="w-full flex justify-center">
//             <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
//           </div>
//           <div className="mt-3 text-center sm:mt-5 w-full">
//             <h3 className="text-lg leading-6 font-medium">
//               Payment Successful
//             </h3>
//             <p className="mt-2 text-sm text-muted-foreground">
//               Congrats to your purchase! Please check your email for further
//               instructions.
//             </p>

//             {downloadUrl && (
//               <Button 
//                 className="mt-4 w-full"
//                 onClick={() => window.open(downloadUrl, '_blank')}
//                 variant="secondary"
//               >
//                 <Download className="mr-2 h-4 w-4" />
//                 Download Files
//               </Button>
//             )}

//             <Button className="mt-4 w-full" asChild>
//               <Link href="/">Back to Homepage</Link>
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </section>
//   );
// }
