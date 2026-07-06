export const avatars = [
  "/assets/images/avatar1.png",
  "/assets/images/avatar2.png",
  "/assets/images/avatar3.png",
  "/assets/images/avatar4.png",
  "/assets/images/avatar5.png",
  "/assets/images/avatar6.png",
  "/assets/images/avatar7.png",
  "/assets/images/avatar8.png"
];

export function getRandomAvatar() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}