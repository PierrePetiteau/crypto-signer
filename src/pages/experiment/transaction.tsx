import { BalancesSection } from "@/src/components/featured/BalancesSection";
import { SignatureForm } from "@/src/components/featured/SignatureForm";
import { TransactionForm } from "@/src/components/featured/TransactionForm";
import { TransferLogs } from "@/src/components/featured/TransferLogs";
import { BalancesContextProvider } from "@/src/contexts/BalancesContext";
import { TransferContextProvider } from "@/src/contexts/TransferContext";

export interface TransferClientContainerProps {}

const TransactionPage = ({}: TransferClientContainerProps) => {
  return (
    <BalancesContextProvider>
      <TransferContextProvider>
        <div className="max-w-screen-lg p-[24px]">
          <BalancesSection />
          <div className="p-4" />
          <TransactionForm />
          <div className="p-4" />
          <SignatureForm />
          <div className="p-4" />
          <TransferLogs />
        </div>
      </TransferContextProvider>
    </BalancesContextProvider>
  );
};

export default TransactionPage;
