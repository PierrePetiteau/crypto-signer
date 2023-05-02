import { BalancesSection } from "@/src/components/featured/BalancesSection";
import { SignatureForm } from "@/src/components/featured/SignatureForm";
import { TransactionForm } from "@/src/components/featured/TransactionForm";
import { TransferLogs } from "@/src/components/featured/TransferLogs";
import { TransferContextProvider } from "@/src/contexts/TransferContext";
import { WalletContextProvider } from "@/src/contexts/WalletsContext";

export interface TransferClientContainerProps {}

const TransactionPage = ({}: TransferClientContainerProps) => {
  return (
    <WalletContextProvider>
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
    </WalletContextProvider>
  );
};

export default TransactionPage;
