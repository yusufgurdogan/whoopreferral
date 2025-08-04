const fs = require('fs');
const path = require('path');

// Simple template engine (like Handlebars but lighter)
function renderTemplate(template, data) {
    let result = template;
    
    // Handle simple variable substitution {{variable}}
    result = result.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const keys = key.trim().split('.');
        let value = data;
        for (const k of keys) {
            value = value?.[k];
        }
        return value !== undefined ? value : '';
    });
    
    // Handle #each loops {{#each array}}...{{/each}}
    result = result.replace(/\{\{#each\s+([^}]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayPath, content) => {
        const keys = arrayPath.trim().split('.');
        let array = data;
        for (const k of keys) {
            array = array?.[k];
        }
        
        if (!Array.isArray(array)) return '';
        
        return array.map(item => {
            return content.replace(/\{\{([^}]+)\}\}/g, (innerMatch, innerKey) => {
                const innerKeys = innerKey.trim().split('.');
                let innerValue = item;
                for (const k of innerKeys) {
                    innerValue = innerValue?.[k];
                }
                return innerValue !== undefined ? innerValue : '';
            });
        }).join('');
    });
    
    return result;
}

function createDirectoryIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
    }
}

function updateSite() {
    try {
        // Load the referral data
        const referralDataPath = path.join(process.cwd(), 'data', 'referral.js');
        if (!fs.existsSync(referralDataPath)) {
            throw new Error('referral.js not found. Please create data/referral.js first.');
        }
        
        // Clear require cache to get fresh data
        delete require.cache[require.resolve(referralDataPath)];
        const referralData = require(referralDataPath);
        
        console.log('Loaded referral data:', {
            referralCode: referralData.referralCode,
            lastUpdated: referralData.lastUpdated
        });

        // Load the template
        const templatePath = process.env.TEMPLATE_PATH || path.join(process.cwd(), 'templates', 'template.html');
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template not found at: ${templatePath}`);
        }
        
        const template = fs.readFileSync(templatePath, 'utf8');
        console.log('Loaded template from:', templatePath);

        // Create pages directory
        const pagesDir = path.join(process.cwd(), 'pages');
        createDirectoryIfNotExists(pagesDir);

        // Render the template with data
        const renderedHTML = renderTemplate(template, referralData);

        // Write the main page
        const indexPath = path.join(pagesDir, 'index.html');
        fs.writeFileSync(indexPath, renderedHTML);
        console.log('Generated:', indexPath);

        // Create additional pages for SEO
        const additionalPages = [
            {
                filename: 'whoop-referral-code.html',
                title: 'WHOOP Referral Code ' + referralData.referralCode + ' - Free Device + $30 Off',
                description: 'Use WHOOP referral code ' + referralData.referralCode + ' to get a free WHOOP 4.0 device, $30 off membership, and 1 month free trial.'
            },
            {
                filename: 'whoop-discount.html',
                title: 'WHOOP Discount & Promo Code - Get $30 Off + Free Device',
                description: 'Get the best WHOOP discount with our referral link. Free WHOOP 4.0 device, $30 off membership, and 1 month free trial.'
            },
            {
                filename: 'whoop-free-trial.html',
                title: 'WHOOP Free Trial - Try WHOOP 4.0 Free for 1 Month',
                description: 'Start your WHOOP free trial today. Get a free WHOOP 4.0 device and try it risk-free for 1 month with our referral link.'
            }
        ];

        additionalPages.forEach(page => {
            const pageData = {
                ...referralData,
                meta: {
                    ...referralData.meta,
                    title: page.title,
                    description: page.description
                }
            };
            
            const pageHTML = renderTemplate(template, pageData);
            const pagePath = path.join(pagesDir, page.filename);
            fs.writeFileSync(pagePath, pageHTML);
            console.log('Generated:', pagePath);
        });

        // Generate sitemap.xml
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://whoopreferral.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://whoopreferral.com/whoop-referral-code.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://whoopreferral.com/whoop-discount.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://whoopreferral.com/whoop-free-trial.html</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

        fs.writeFileSync(path.join(pagesDir, 'sitemap.xml'), sitemap);
        console.log('Generated: sitemap.xml');

        // Create robots.txt
        const robots = `User-agent: *
Allow: /

Sitemap: https://whoopreferral.com/sitemap.xml`;

        fs.writeFileSync(path.join(pagesDir, 'robots.txt'), robots);
        console.log('Generated: robots.txt');

        // Create CNAME file for custom domain (optional)
        const cname = 'whoopreferral.com';
        fs.writeFileSync(path.join(pagesDir, 'CNAME'), cname);
        console.log('Generated: CNAME');

        console.log('\n✅ Site generation completed successfully!');
        console.log('🔗 Referral link:', referralData.referralLink);
        console.log('📅 Last updated:', referralData.lastUpdated);
        
    } catch (error) {
        console.error('❌ Error generating site:', error.message);
        process.exit(1);
    }
}

// Run the update
if (require.main === module) {
    updateSite();
}

module.exports = { updateSite };