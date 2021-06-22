export function userFactory(obj) {
  return `
    <div class="chat-member">
      <div class="chat-member-logo"></div>
      <p class="chat-member-name">${obj.name}</p>
    </div>
    `;
}

export function thisUserFactory() {
  return `
      <div class="chat-member">
        <div class="chat-member-logo"></div>
        <p class="chat-member-name">You</p>
      </div>
      `;
}
