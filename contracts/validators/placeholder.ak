use cardano/address.{Credential}
use cardano/assets.{PolicyId}
use cardano/certificate.{Certificate}
use cardano/governance.{ProposalProcedure, Voter}
use cardano/transaction.{Transaction, OutputReference}

validator placeholder {
  mint(_redeemer: Data, _policy_id: PolicyId, _self: Transaction) {
    // todo @"mint logic goes here"
    true
  }

  spend(_datum: Option<Data>, _redeemer: Data, _utxo: OutputReference, _self: Transaction) {
    // todo @"spend logic goes here"
    true
  }

  withdraw(_redeemer: Data, _account: Credential, _self: Transaction) {
    // todo @"withdraw logic goes here"
    true
  }

  publish(_redeemer: Data, _certificate: Certificate, _self: Transaction) {
    // todo @"publish logic goes here"
    true
  }

  vote(_redeemer: Data, _voter: Voter, _self: Transaction) {
    // todo @"vote logic goes here"
    true
  }

  propose(_redeemer: Data, _proposal: ProposalProcedure, _self: Transaction) {
    // todo @"propose logic goes here"
    true
  }

  // // If needs be, remove any of unneeded handlers above, and use:
  //
  // else(_ctx: ScriptContext) {
  //   todo @"fallback logic if none of the other purposes match"
  // }
  //
  // // You will also need an additional import:
  // //
  // // use cardano/script_context.{ScriptContext}
}
