// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useConnect } from 'contexts/Connect';
import { useTxMeta } from 'contexts/TxMeta';
import React, { useEffect } from 'react';
import type { SubmitProps } from '../types';
import { Ledger } from './Ledger';
import { Vault } from './Vault';

export const ManualSign = (
  props: SubmitProps & { buttons?: React.ReactNode[] }
) => {
  const { getAccount } = useConnect();
  const { getTxSignature, sender } = useTxMeta();
  const accountMeta = getAccount(sender);
  const source = accountMeta?.source;

  const { onSubmit } = props;

  // Automatically submit transaction once it is signed.
  useEffect(() => {
    if (getTxSignature() !== null) {
      onSubmit();
    }
  }, [getTxSignature()]);

  return (
    <>
      {source === 'ledger' && <Ledger {...props} />}
      {source === 'vault' && <Vault {...props} />}
    </>
  );
};
