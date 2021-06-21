export function messageFactory(obj) {
  return `
    <div class="messaege-container">
        <span class="messager">${obj.messager}, ${obj.time}</span>
        <span class="message">${obj.text}</span>
    </div>
    `;
}

export function userMessageFactoty(obj) {
  return `
    <div class="messaege-container user">
        <span class="messager">You, ${obj.time}</span>
        <span class="message">${obj.text}</span>
    </div>
    `;
}
