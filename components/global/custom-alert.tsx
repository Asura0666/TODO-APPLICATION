import { useModal } from "@/providers/modal-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomAlert = ({ title, subheading, children, defaultOpen }: Props) => {
  const { isOpen, setClose } = useModal();

  const handleClose = () => setClose();

  return (
    // <Drawer open={isOpen} onClose={handleClose}>
    //   <DrawerContent className="">
    //     <DrawerHeader>
    //       <DrawerTitle className="text-center">{title}</DrawerTitle>
    //       <DrawerDescription className="text-center flex flex-col items-center gap-4 h-96 overflow-hidden">
    //         {subheading}
    //         {children}
    //       </DrawerDescription>
    //     </DrawerHeader>
    //     <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
    //       <DrawerClose>
    //         <Button variant="ghost" className="w-full hover:bg-red-600" onClick={handleClose}>
    //           Close
    //         </Button>
    //       </DrawerClose>
    //     </DrawerFooter>
    //   </DrawerContent>
    // </Drawer>

    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{subheading}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 hover:bg-red-500 dark:text-cream/75"
            onClick={handleClose}
          >
            {children}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
