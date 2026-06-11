import Dialog, { type DialogProps } from "@/components/Dialog.tsx";

const WitchDialog = (props: DialogProps) => {
  return (
    <div className="z-0 flex h-full w-full flex-row items-end justify-end pb-1 pr-[3%] lg:flex-col lg:items-center lg:justify-end lg:p-12">
      <Dialog {...props} />
    </div>
  );
};
export default WitchDialog;
