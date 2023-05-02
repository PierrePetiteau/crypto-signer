import Link from "next/link";

export default function GetStarted() {
  return (
    <div className="max-w-screen-lg">
      <div className="card m-[24px] p-[16px] bg-base-200">
        <h2 className="text-xl font-medium pb-8">Get started</h2>
        <p>
          {`This experiment is an attempt to mock a secure transaction system with private keys. It's a helpful way to
          understand the basics of cryptography in practice. You can play with the generated transaction payload and
          check the result.`}
        </p>
        <p>You can try one of the following modification</p>
        <ul>
          <li>Try to sign a transaction between Bob and Alice using Satoshi private key</li>
          <li>Try to spend more than the user balance</li>
          <li>Try to modify the sender public address</li>
        </ul>

        <div className="p-2" />

        <div className="flex w-full justify-end">
          <Link href={"/experiment/transaction"} className="btn btn-sm btn-outline btn-secondary">
            Start experiment
          </Link>
        </div>
      </div>
    </div>
  );
}
