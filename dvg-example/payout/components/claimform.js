import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import theme from '../theme.js'
import { ThemeProvider } from 'emotion-theming'
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link,
  Image,
  Card,
} from 'rebass'
import { EditingState } from '@devexpress/dx-react-grid';

const rpcWrapperEngine = require('../engine.js')
const ethUtil = require('ethereumjs-util');
const config = require('../get-config')
const EthQuery = require('ethjs-query');
const engine = rpcWrapperEngine({
  rpcUrl: config.rpcOrigin,
  addressHex: config.address,
  privateKey: ethUtil.toBuffer(config.privateKey),
})

const ethQuery = new EthQuery(engine)
const ether = 1e18


const ClaimForm = (props) => {

  const [result, setResult] = useState(null)
  const [txHash, setTxHash] = useState(null)

  const account = useRef(null)

  const claimToWallet = async () => {
    const ether = 1e18
    const amountWei = (0.1 * ether)

    try {
      const txHash = await ethQuery.sendTransaction({
        to: account.current.value,
        from: config.address,
        value: amountWei,
        data: '',
      })

      setResult("Success!")
      setTxHash(txHash)

    } catch(e) {
      console.log(e)
      setResult(e.message)
      return null
    }

  }

  return (
    <ThemeProvider theme={theme}>
      <Heading color='primary'>
        Congratulations, You just won 0.1 ETH from World of Mines!
      </Heading>

      {!txHash &&
        <form
        onSubmit={e => {
          e.preventDefault()
          setResult("Loading...")
          claimToWallet()
        }}
        >
          <div className="form-group">
            <h4>Enter ETH Wallet Account to Claim</h4>
            <textarea
              className="form-control"
              ref={account}
              placeholder="0xaabb....eeff"
            />
          </div>
          <button>Claim</button>
      </form>
      }
      <p>{result}</p>
      {txHash && (
        <a href={"https://ropsten.etherscan.io/tx/" + txHash}>
          {"Etherscan: " + txHash}
        </a>
      )}
    </ThemeProvider>
  )

}

export default ClaimForm
