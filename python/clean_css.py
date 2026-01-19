import re

file_path = r'd:\Github\BTI-TEX\CSS\style.css'

def clean_css(content):
    # 1. Remove empty rules: selector { \s* }
    # We do this iteratively because removing one might make a media query empty.
    
    # Regex for empty block: [^{}]+\{\s*\}
    # This is simplistic. A better way:
    # Find { \s* } and remove it AND the preceding selector.
    
    # Let's iterate until no change
    original_len = len(content)
    
    while True:
        prev_len = len(content)
        
        # Remove empty rules: selector { } 
        # CAUTION: This replaces "anything { }" which might match "@media { }". 
        # But we want to remove empty @media too.
        # However, we must be careful about nested braces. 
        # Standard CSS rules are depth 0 or 1.
        
        # Regex to match: Any non-brace characters, then { whitespace }
        content = re.sub(r'[^\{\}]+\{\s*\}', '', content)
        
        # Also clean up empty @media specifically if it has nothing inside
        # @media ... { \s* }
        content = re.sub(r'@media[^{]+\{\s*\}', '', content)
        
        # Clean up double newlines repeatedly
        content = re.sub(r'\n\s*\n', '\n\n', content)
        
        if len(content) == prev_len:
            break

    # 2. Fix dangling commas in selectors:
    # "selector, {" -> "selector {"
    content = re.sub(r',\s*\{', ' {', content)
    
    return content

def main():
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = clean_css(content)
    
    if len(new_content) != len(content):
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Cleaned CSS. Removed {len(content) - len(new_content)} characters (likely empty blocks).")
    else:
        print("CSS was already clean (no empty blocks found).")

if __name__ == '__main__':
    main()
