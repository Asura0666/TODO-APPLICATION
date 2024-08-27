import { useModal } from "@/providers/modal-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomDialog = ({ title, subheading, children, defaultOpen }: Props) => {
  const { isOpen, setClose } = useModal();

  const handleClose = () => setClose();

  return (
    // <AlertDialog open={isOpen}>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>{title}</AlertDialogTitle>
    //       <AlertDialogDescription>{subheading}</AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
    //       <AlertDialogAction
    //         className="bg-red-700 hover:bg-red-500 dark:text-cream/75"
    //         onClick={handleClose}
    //       >
    //         {children}
    //       </AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>

    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
