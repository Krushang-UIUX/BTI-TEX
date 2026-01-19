import re
import shutil

css_file_path = r'd:\Github\BTI-TEX\CSS\style.css'
backup_path = r'd:\Github\BTI-TEX\CSS\style.css.bak'

selectors_to_remove = [
    '.98px', '.about-meal', '.arrow-size', '.bg-danger', '.bg-footer', '.bg-heaven', 
    '.bg-light', '.bg-primary', '.bg-pure', '.bg-secondary', '.bg-ternary', '.big-deal', 
    '.bti-home-img', '.bti-logo', '.bti-logo-new', '.btn-padding-about-meal', '.btn-primary', 
    '.btn-secondary', '.btn-wrapper', '.bunty', '.card-wrapper', '.commingsoon', '.common-bg', 
    '.contact-info-left', '.contact-info-right', '.contact-info-wrapper', '.contact-us', 
    '.copyright', '.d-grid', '.divider', '.flex-1', '.header-content', '.hiding', '.input-wrap', 
    '.instagram-api', '.justify-between', '.justify-center', '.loading-spinner', '.logo-center', 
    '.machine-card', '.magic-shadow', '.magic-shadow-sm', '.main-image', '.main-wrapper', 
    '.nav-background', '.no-products', '.our-services', '.post-wrap', '.product-details', 
    '.product-grid', '.product-image-container', '.product-loading', '.product-thumbnails', 
    '.showing', '.since-text', '.slick-list', '.slick-track', '.stars', '.subscribe', 
    '.text-danger', '.text-footer', '.text-heaven', '.text-light', '.text-primary', 
    '.text-pure', '.text-secondary', '.text-ternary', '.thumb-img', '.top-products', 
    '.wc-margin', '.welcome', '.zig-zag-reverse'
]

def main():
    # Backup
    try:
        shutil.copy2(css_file_path, backup_path)
        print(f"Backed up style.css to {backup_path}")
    except Exception as e:
        print(f"Backup failed: {e}")
        return

    with open(css_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    initial_len = len(content)
    print(f"Initial size: {initial_len} chars")

    for selector in selectors_to_remove:
        # Regex to find the selector block:
        # 1. The selector itself (escaped)
        # 2. Optional whitespace
        # 3. Opening brace {
        # 4. Any content that is NOT a closing brace (non-greedy)
        # 5. Closing brace }
        # We also attempt to match valid CSS whitespace/comments around it to clean up fully.
        
        # NOTE: This simple regex fails on nested braces (media queries use braces).
        # However, we are removing CLASSES. Classes are usually leaves.
        # BUT if a class is INSIDE a media query, it look like:
        # @media ... { .class { ... } }
        # Our regex `\.class\s*\{[^}]*\}` matches the inner block perfectly.
        # It won't match the outer media query block because that starts with @media.
        # So this is safe for removing rules even inside media queries.
        
        pattern = r'\s*' + re.escape(selector) + r'\s*\{[^}]*\}'
        
        matches = re.findall(pattern, content)
        if matches:
            print(f"Removing {selector}: found {len(matches)} instance(s)")
            content = re.sub(pattern, '', content)
        else:
            print(f"Selector {selector} not found (might have strictly different formatting)")

    # Clean up multiple newlines
    content = re.sub(r'\n\s*\n', '\n\n', content)

    with open(css_file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    final_len = len(content)
    print(f"Final size: {final_len} chars")
    print(f"Removed roughly {initial_len - final_len} chars")

if __name__ == '__main__':
    main()
