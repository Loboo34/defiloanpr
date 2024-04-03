export async function createBorrower(borrower) {
  return window.canister.loanManager.addBorrower(borrower);
}

export async function updateBorrower(borrower) {
  return window.canister.loanManager.updateBorrower(borrower);
}

export async function followBorrower(borrowerId) {
  return window.canister.loanManager.followBorrower(borrowerId);
}

export async function getBorrowerByOwner() {
  try {
    return await window.canister.loanManager.getBorrowerByOwner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getBorrowers() {
  try {
    return await window.canister.loanManager.getBorrowers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
