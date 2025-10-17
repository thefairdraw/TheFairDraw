# TheFairDraw

Meet Proof of Nothing: *A zero-token, zero-state, fully deterministic fairness protocol.*  
Free to use. Open-source forever. No tracking, no monetization, no hidden agenda.

---

##  What is TheFairDraw?

TheFairDraw is a *stateless, deterministic draw engine* designed for public verifiability and trustless randomness — without oracles, tokens, or any financial infrastructure.

Each draw takes:
- A list of participants (any size up to 1 million items)
- A cryptographically secure ephemeral seed (generated on draw)
- And outputs a *verifiable, irreversible result*

You can verify any draw using:
- The original list
- The shared ephemeral seed
- The exact draw result

---

##  How does it work?

1. A *secure ephemeral seed* is generated on the client at the time of the draw.
2. The list is hashed together with the seed using SHA-256.
3. The resulting hash determines the winner.
4. Nothing is stored. Everything is fully deterministic.

All logic is *open-source* and runs entirely in-browser. No API keys, no central servers.

---

##  No Tokens. No Donations.

- TheFairDraw has *no cryptocurrency token*, governance coin, or utility asset.
- No donation wallets are provided or endorsed.  
- Any token, coin, or donation address claiming affiliation is a *scam*.

---

##  Trust Model

- You should *not trust this site*. You should verify.
- All draws can be reproduced using the same input and seed.
- There is no backend, no state, no way to interfere with results.

If in doubt, read the source code or fork it.

---

##  License

MIT License.  
Use it, remix it, audit it, abuse it — as long as you don’t break the license.

---

##  Reminder

TheFairDraw is offered as-is, for public utility.  
There is no support system, no roadmap, no obligation to reply to inquiries.  
It is not a product. It is a protocol.
draw.js → Generates the result using the provided list and ephemeral seed.
verify.js → Verifies any result using the same inputs.

No backend. No state. No token. Just math

Use responsibly. Fork if necessary. Stay fair.
