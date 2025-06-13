import { useCallback, useMemo, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { parseAbi } from "viem";
import { getKernelClient } from "@/lib/get-kernel-client";

const CONTRACT_ADDRESS = "0x142D68289c121015598503d51379ECa00c1C9A4D" as const;

const abi = parseAbi([
  "function claim(address,uint256,uint256,address,uint256,(bytes32[] proof,uint256 quantityLimitPerWallet,uint256 pricePerToken,address currency),bytes) payable",
]);

type ClaimArgs = {
  receiver: `0x${string}`;
  tokenId: bigint;
  quantity?: bigint;
  currency?: `0x${string}`;
  pricePerToken?: bigint;
  data?: `0x${string}`;
};

export const useClaimNft = () => {
  const { primaryWallet } = useDynamicContext();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const clientPromise = useMemo(async () => {
    if (!primaryWallet) return null;
    return await getKernelClient(primaryWallet);
  }, [primaryWallet]);

  const claim = useCallback(
    async ({ receiver, tokenId, quantity = 1n }: ClaimArgs) => {
      const client = await clientPromise;
      if (!client) throw new Error("Kernel client not ready");

      setLoading(true);
      setTxHash(null);
      setError(null);
      try {
        const hash = await client.writeContract({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "claim",
          args: [
            receiver,
            tokenId,
            quantity,
            "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            0n,
            {
              proof: [],
              quantityLimitPerWallet: 0n,
              pricePerToken: 0n,
              currency: "0x0000000000000000000000000000000000000000",
            },
            "0x",
          ],
          value: 0n,
        });
        setTxHash(hash);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [clientPromise]
  );

  return { claim, loading, txHash, error };
};
