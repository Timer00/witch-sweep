import Dialog, { type DialogProps } from "@/components/Dialog.tsx";

const WitchDialog = (props: DialogProps) => {
  return (
    <div className="flex z-0 h-[100vh] w-[100vw] flex-row items-end justify-center pb-1 lg:flex-col lg:items-center lg:justify-end lg:p-12">
      <Dialog
        {...props}
      />
    </div>
  );
};
export default WitchDialog;
