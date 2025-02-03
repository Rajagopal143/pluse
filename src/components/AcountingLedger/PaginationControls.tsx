// import { Button } from "@/components/ui/button";

// interface PaginationControlsProps {
//     currentPage: number;
//     totalPages: number;
//     setCurrentPage: (page: number) => void;
// }

// export const PaginationControls = ({
//     currentPage,
//     totalPages,
//     setCurrentPage,
// }: PaginationControlsProps) => (
//     <div className="flex justify-end items-center gap-2 mt-4">
//         <Button
//             variant="outline"
//             onClick={() => setCurrentPage((prev:any) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//         >
//             Previous
//         </Button>
//         <span>
//             Page {currentPage} of {totalPages}
//         </span>
//         <Button
//             variant="outline"
//             onClick={() => setCurrentPage((prev:any) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//         >
//             Next
//         </Button>
//     </div>
// );