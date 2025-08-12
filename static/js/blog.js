const authors = {
  akaal: {
    name: "Akaal",
    pfp: "pfps/akaal.png",
    role: "Volunteer",
    meta: "https://github.com/Spacexplorer11"
  },
  jim: {
    name: "Jim",
    pfp: "pfps/jim.png",
    role: "Admin",
    meta: "https://github.com/jimmydin7"
  }
};
const announcementsData = [
  {
    title: "New Reward!",
    content: "I am very pleased to say that authly just dropped a sick new reward! The GL.iNet GL-SFT1200 travel router with VPN and OpenWrt is now available for 10 hours! (Yep it's the same one from Summer of Making!). Unfortunately, it's only available in the UK, US, Canada, Europe and Australia :(",
    date: "Aug 12, 2025",
    importance: "Important",
    authorId: "akaal"
  },
  {
    title: "Authly is live!",
    content: "Hey folks, I am super glad to announce that authly is finally live! It will last until the end of August. You can get rewards from yubikeys, to nfc tags and antivirus software giftcards. You can even get 2 yubikeys for 20 hours of work! For more go into our slack #authly!",
    date: "Aug 5, 2025",
    importance: "Super Important",
    authorId: "jim"
  },
  {
    title: "We just got access to HCB!",
    content: "The YSWS-AUTHLY Hack Club Bank (HCB) organization just got approved, Leo is currently helping me set up restrictions! We are getting way close to launch than you think!",
    date: "Aug 4, 2025",
    importance: "Medium",
    authorId: "jim"
  },
  {
    title: "New rewards for authly",
    content: "After some consideration, me and my POC decided yubikeys, programmable NFC tags, and antivirus software giftcards as the rewards we will offer. You will be getting yubikeys for 10 hours of work, NFC tags for 4 hours of work, and antivirus for around 6 hours of work.",
    date: "Aug 4, 2025",
    importance: "High",
    authorId: "jim"
  },
  {
    title: "How I help in Authly",
    content: "Hey, my name is Akaalroop and I have been helping Jim with Authly for a while now. I've got nearly 100 commits in the authly repo!",
    date: "Aug 3, 2025",
    importance: "Low",
    authorId: "akaal"
  }
];
const container = document.getElementById("announcements");
announcementsData.forEach(item => {
  const author = authors[item.authorId];
  const html = `
    <div class="bg-gray-800 p-5 rounded-xl shadow-md">
      <div class="flex items-center space-x-4 mb-3">
        <img src="${author.pfp}" alt="${author.name} avatar" class="w-10 h-10 rounded-full" />
        <div>
          <a href="${author.meta}" target="_blank" rel="noopener noreferrer" class="text-gray-400 underline">
  ${author.name}
</a>
          <p class="text-xs text-gray-400">${item.date} • ${author.role}</p>
        </div>
      </div>
      <h3 class="text-lg font-semibold mb-1">${item.title}</h3>
      <p class="text-sm text-gray-300">${item.content}</p>
      <p class="text-xs mt-2 text-gray-500 italic">Importance: ${item.importance}</p>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
});
