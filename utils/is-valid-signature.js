const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');
const settings = require('../settings');
const { isAddress, toChecksumAddress } = require('web3-utils');

// bytes4(keccak256("isValidSignature(bytes,bytes)")
const ERC1271_MAGIC_VALUE = '0x20c13b0b';
//the magic number is for (bytes, bytes), but the abi is for (bytes32,bytes)
//needs discussion
const ABI = [
  {
    constant: true,
    inputs: [
      {
        name: 'hash',
        type: 'bytes32',
      },
      {
        name: '_signature',
        type: 'bytes',
      },
    ],
    name: 'isValidSignature',
    outputs: [
      {
        name: 'magicValue',
        type: 'bytes4',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];


async function isValidSignature(challenge, signature, address) {

  var recoveredAddress;
  try {
    const sig = signature.substring(2);
    const r = "0x" + sig.substring(0, 64);
    const s = "0x" + sig.substring(64, 128);
    const v = parseInt(sig.substring(128, 130), 16);
    recoveredAddress = "0x" + ethUtil.pubToAddress(ethUtil.ecrecover(challenge,v,r,s)).toString("hex")
    if(toChecksumAddress(address)==toChecksumAddress(recoveredAddress)){
      return true;
    }
  } catch(err) {} // sometimes throws an error for messages signed by smart contracts


  const erc1271CoreContract = new settings.web3.eth.Contract(ABI, address);

  const magicValue = await erc1271CoreContract.methods
    .isValidSignature("0x" + challenge.toString("hex"),signature)
    .call();

  return magicValue === ERC1271_MAGIC_VALUE;

  
}
module.exports = isValidSignature;
