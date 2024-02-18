import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  AirportsManager,
  TokenCreated,
} from "../generated/AirportsManager/AirportsManager";
import { Token } from "../generated/schema";

export function handleTokenCreated(event: TokenCreated): void {
  let senderString = event.params._ownerAddress.toHexString();
  let token = Token.load(senderString);

  if (token === null) {
    token = new Token(senderString);
  }
//     token.address = event.params.greetingSetter;
//     sender.createdAt = event.block.timestamp;
//     sender.greetingCount = BigInt.fromI32(1);
//   } else {
//     sender.greetingCount = sender.greetingCount.plus(BigInt.fromI32(1));
//   }

//   token = event.params.newGreeting;
//   greeting.sender = senderString;
//   greeting.premium = event.params.premium;
//   greeting.value = event.params.value;
//   greeting.createdAt = event.block.timestamp;
//   greeting.transactionHash = event.transaction.hash.toHex();

//   greeting.save();
//   sender.save();
  token.save();
}
