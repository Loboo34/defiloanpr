export async function createLender(lender) {
  return window.canister.loanManager.addLender(lender);
}

export async function updateLender(lender) {
  return window.canister.loanManager.updateLender(lender);
}

export async function followLender(lenderId) {
  return window.canister.loanManager.followLender(lenderId);
}

export async function getLenderByOwner() {
  try {
    return await window.canister.loanManager.getLenderByOwner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getLenders() {
  try {
    return await window.canister.loanManager.getLenders();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}
