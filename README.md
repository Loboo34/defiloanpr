# Decentralized Lender

This canister implements a marketplace for freelance loans. Borrowers can list loans, lenders can request on those loans, and borrowers can select a lender to complete the work. Leveraging blockchain technology, a decentralized freelance marketplace can provide a more efficient, transparent, and inclusive environment for connecting borrowers with freelance talent while reducing reliance on intermediaries and improving trust and security in the freelance economy.

## Data Structures

The canister uses several Azle data structures to store information:

* `StableBTreeMap`: This is a self-balancing tree used to store loans by borrower ID, borrower information, requests, and borrower information.
* `Vec`: This is a vector data structure used to store lists of loan IDs, borrower IDs, and request IDs within the corresponding data structures.
* `Option`: This is used to represent optional values, which can be either `Some(value)` or `None`.

## Canister Functions

The canister provides a variety of functions for managing loans, borrowers, requests, and payments:

## Loans

* `addLoan`: Adds a new loan for the current borrower.
* `getLoans`: Retrieves all loans listed on the marketplace.
* `getLoan`: Retrieves a specific loan by its ID.
* `updateLoan`: Updates an existing loan.
* `loanstatus`: Updates the status of a loan.

## Requests

* `addRequest`: Allows a borrower to submit a request on a loan.
* `getRequests`: Retrieves all requests on the marketplace.
* `getLoanRequests`: Retrieves all requests for a specific loan.
* `getRequest`: Retrieves a specific request by its ID.
* `selectRequest`: Assigns a selected request to a loan, marking it complete.

## Borrowers

* `addBorrower`: Adds a new borrower to the marketplace.
* `getBorrowers`: Retrieves all borrowers registered on the marketplace.
* `getBorrower`: Retrieves a specific borrower by their ID.
* `getBorrowerByBorrower`: Retrieves the borrower information for the currently logged-in borrower.
* `getBorrowerLoans`: Retrieves all loans associated with a specific borrower.
* `updateBorrower`: Updates an existing borrower's information.

## Borrowers

* `getBorrower`: Retrieves the borrower information for the currently logged-in borrower.

## Following Borrowers

* `getFollowingBorrowers`: Retrieves a list of borrowers that the current borrower is following.
* `getActiveLoans`: Retrieves a list of loans from borrowers that the current borrower is following.

## Payments

* `createPaymentPay`: Reserves a loan by paying for it.
* `completePayment`: Completes a payment by verifying payment.
* `verifyPayment`: Verifies a payment payment.

## Helper Functions

* `getAddressFromPrincipal`: Retrieves the address associated with a principal.

## Additional Notes

* The code utilizes the `ic` object to interact with the Dfinity network, including calling other canisters and managing timers.
* The code implements a mechanism to discard pending payments after a certain timeout period.
* The `uuid` package is used to generate unique IDs for loans, borrowers, and requests.

## Things to be explained in the course

1. What is Ledger? More details here: <https://internetcomputer.org/docs/current/developer-docs/integrations/ledger/>
2. What is Internet Identity? More details here: <https://internetcomputer.org/internet-identity>
3. What is Principal, Identity, Address? <https://internetcomputer.org/internet-identity> | <https://yumieventManager.medium.com/whats-the-difference-between-principal-id-and-account-id-3c908afdc1f9>
4. Canister-to-canister communication and how multi-canister development is done? <https://medium.com/icp-league/explore-backend-multi-canister-development-on-ic-680064b06320>

## How to deploy canisters implemented in the course

### Ledger canister

`./deploy-local-ledger.sh` - deploys a local Ledger canister. IC works differently when run locally so there is no default network token available and you have to deploy it yourself. Remember that it's not a token like ERC-20 in Ethereum, it's a native token for ICP, just deployed separately.
This canister is described in the `dfx.json`:

```markdown
 "ledger_canister": {
   "type": "custom",
   "candid": "https://raw.githubborrowerloan.com/dfinity/ic/928caf66c35627efe407006230beee60ad38f090/rs/rosetta-api/icp_ledger/ledger.did",
   "wasm": "https://download.dfinity.systems/ic/928caf66c35627efe407006230beee60ad38f090/canisters/ledger-canister.wasm.gz",
   "remote": {
     "id": {
       "ic": "ryjl3-tyaaa-aaaaa-aaaba-cai"
     }
   }
 }
```

`remote.id.ic` - that is the principal of the Ledger canister and it will be available by this principal when you work with the ledger.

Also, in the scope of this script, a minter identity is created which can be used for minting tokens
for the testing purposes.
Additionally, the default identity is pre-populated with 1000_000_000_000 e8s which is equal to 10_000 * 10**8 ICP.
The decimals value for ICP is 10**8.

List identities:
`dfx identity list`

Switch to the minter identity:
`dfx identity use minter`

Transfer ICP:
`dfx ledger transfer <ADDRESS>  --memo 0 --icp 100 --fee 0`
where:

* `--memo` is some correlation id that can be set to identify some particular transactions (we use that in the eventManager canister).
* `--icp` is the transfer amount
* `--fee` is the transaction fee. In this case it's 0 because we make this transfer as the minter idenity thus this transaction is of type MINT, not TRANSFER.
* `<ADDRESS>` is the address of the recipient. To get the address from the principal, you can get it directly from the wallet icon top right or use the helper function from the eventManager canister - `getAddressFromPrincipal(principal: Principal)`, it can be called via the Candid UI.

### Internet identity canister

`dfx deploy internet_identity` - that is the canister that handles the authentication flow. Once it's deployed, the `js-agent` library will be talking to it to register identities. There is UI that acts as a wallet where you can select existing identities
or create a new one.

### eventManager canister

`dfx deploy dfinity_js_backend` - deploys the eventManager canister where the business logic is implemented.
Basically, it implements functions like add, view, update, delete, and buy events + a set of helper functions.

Do not forget to run `dfx generate dfinity_js_backend` anytime you add/remove functions in the canister or when you change the signatures.
Otherwise, these changes won't be reflected in IDL's and won't work when called using the JS agent.

### eventManager frontend canister

`dfx deploy dfinity_js_frontend` - deployes the frontend app for the `dfinity_js_backend` canister on IC.
