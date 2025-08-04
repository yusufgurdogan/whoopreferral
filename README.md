# 🏃 WHOOP Referral Site

A simple, automated WHOOP referral landing page that deploys to GitHub Pages. Built with the same proven architecture as the netcup vouchers site - **it just works!**

## 🎯 Goal

Get **WHOOP 4.0 FREE forever** by referring at least 1 person per month. Each referral = 1 free month!

## 🎁 What Visitors Get

- **FREE WHOOP 4.0 Device** (worth $239)
- **$30 OFF** membership
- **1 Month FREE** trial  
- **Free shipping**

## 🔗 Your Referral Link

**Current Link:** https://join.whoop.com/776C97  
**Referral Code:** 776C97

## 🚀 Quick Setup

### 1. Create the Repository

```bash
# Create new repository on GitHub
git clone https://github.com/yourusername/whoop-referral.git
cd whoop-referral
```

### 2. Project Structure

```
whoop-referral/
├── data/
│   └── referral.js          # 👈 ONLY FILE YOU EDIT
├── templates/
│   └── template.html        # Main page template
├── scripts/
│   └── update-site.js       # Site generator
├── .github/workflows/
│   └── update-site.yml      # Auto-deployment
├── pages/                   # Generated site (auto-created)
├── package.json
└── README.md
```

### 3. Setup GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" in the sidebar
3. Set Source to "GitHub Actions"
4. Enable "Enforce HTTPS"

### 4. First Deployment

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Commit and push to trigger deployment
git add .
git commit -m "🚀 Initial WHOOP referral site setup"
git push
```

## ✏️ Making Changes

### To Update Your Referral Link

**Only edit `data/referral.js`:**

```javascript
module.exports = {
  referralLink: "https://join.whoop.com/YOUR_NEW_CODE",
  referralCode: "YOUR_NEW_CODE",
  lastUpdated: "2025-07-26",
  // ... rest stays the same
};
```

### Auto-Deployment

- Push changes to `data/referral.js` → Site updates automatically
- GitHub Actions watches for changes and redeploys
- No manual work needed!

## 🎨 Customization

### Update Personal Info

Edit these fields in `data/referral.js`:

```javascript
personal: {
  name: "Your Name",
  message: "Your personal message",
  experience: "Your WHOOP experience story"
}
```

### Modify Page Content

All content is data-driven through `data/referral.js`:

- Benefits and features
- FAQ questions and answers  
- Meta tags for SEO
- Personal messaging

### Design Changes

Edit `templates/template.html` for styling/layout changes.

## 📊 SEO Features

- **Multiple landing pages** (referral code, discount, free trial)
- **Auto-generated sitemap.xml**
- **Structured data and meta tags**
- **Mobile responsive design**
- **Fast loading times**

## 🔧 Development

### Local Development

```bash
# Generate site locally
npm run build

# Serve locally with live reload
npm run dev
# Opens http://localhost:3000
```

### Testing

```bash
# Test site generation
npm test
```

## 📈 Tracking & Analytics

### Built-in Click Tracking

The site includes basic click tracking:

```javascript
function trackClick(source) {
  console.log('Click tracked:', source);
  // Add Google Analytics here
}
```

### Add Google Analytics

1. Get your GA4 tracking ID
2. Add to `templates/template.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🚀 Marketing Tips

### Share Your Link

1. **Social Media** - Twitter, Instagram, LinkedIn
2. **Fitness Communities** - Reddit r/fitness, r/whoop
3. **Friend Networks** - Text, email, word-of-mouth
4. **Content Creation** - Blog about your WHOOP journey

### SEO Optimization

- Submit sitemap to Google Search Console
- Share on referral aggregator sites:
  - ReferralCodes.com
  - Refer.guide  
  - Invitation.codes

### Conversion Tips

- **Personal Story** - Share your real WHOOP experience
- **Before/After** - Show fitness improvements
- **Social Proof** - Screenshots of your data
- **Urgency** - Limited-time offers from WHOOP

## 🛡️ Compliance

### FTC Disclosure

The site includes proper referral disclosure:

> "FTC Disclosure: This page contains referral links. When you sign up through these links, I may receive a free month of WHOOP membership at no extra cost to you."

### Best Practices

- ✅ Clear disclosure of referral relationship
- ✅ Honest benefits description  
- ✅ No false claims about WHOOP
- ✅ Transparent about mutual benefits

## 🔄 Maintenance

### Monthly Tasks

1. **Check referral link** - Ensure it's still working
2. **Update content** - Fresh personal experiences
3. **Monitor conversions** - Track successful referrals
4. **Update data** - New WHOOP features or promotions

### Zero-Maintenance Operation

- GitHub Actions handle all deployments
- No servers to maintain
- No hosting costs
- Automatic HTTPS and CDN

## 📞 Support

### WHOOP Referral Program

- **Official Info**: whoop.com/refer-a-friend
- **Support**: WHOOP customer service
- **Terms**: Check WHOOP's referral terms

### Technical Issues

- Check GitHub Actions logs for deployment issues
- Validate HTML at validator.w3.org
- Test responsiveness at responsinator.com

## 🎉 Success Metrics

### Track Your Progress

- **Monthly Referrals**: Aim for 1+ per month
- **Conversion Rate**: Clicks → Sign-ups
- **Free Months Earned**: Total saved money
- **Site Traffic**: Visitors and engagement

### Goal Achievement

**Target**: 1 referral per month = Free WHOOP forever! 🎯

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - Feel free to use and modify!

---

**🚀 Get started now and make WHOOP free forever!**

Last updated: 2025-07-26