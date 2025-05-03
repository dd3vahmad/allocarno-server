module store_hash

type Datum = ByteArray
type Redeemer = Unit
use aiken/transaction


validator store_hash: Datum, Redeemer, ScriptContext -> Bool
validator store_hash(datum, _redeemer, _ctx) {
  // You can add logic here if you want to validate the hash
  // Right now, it just always succeeds
  True
}
