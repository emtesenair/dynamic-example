import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { Wallet } from "@dynamic-labs/sdk-react-core";

export async function getKernelClient(wallet: Wallet) {
  const { connector } = wallet;

  if (!isZeroDevConnector(connector)) return null;
  await connector.getNetwork();

  return connector.getAccountAbstractionProvider({
    withSponsorship: true,
  });
}
