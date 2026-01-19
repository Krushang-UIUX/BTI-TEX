import re

file_path = r'd:\Github\BTI-TEX\CSS\style.css'

def format_css(content):
    # Normalize newlines
    content = content.replace('\r\n', '\n').replace('\r', '\n')
    
    # Remove multiple whitespace/tabs with single space (careful not to break strings)
    # This is too aggressive for content.
    # Better: simple tokenization or line-by-line processing.
    
    # Simple formatting strategy:
    # 1. Split by '}'
    # 2. Trim whitespace
    # 3. Re-indent
    
    # This is tricky without a real parser. 
    # Let's try to just fix indentation of properties inside blocks.
    
    lines = content.split('\n')
    formatted_lines = []
    level = 0
    indent_str = '    ' # 4 spaces
    
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
            
        # Check for closing brace
        if stripped.startswith('}'):
            level = max(0, level - 1)
        
        # Add indentation
        formatted_lines.append((indent_str * level) + stripped)
        
        # Check for opening brace (block start)
        # Note: This handles "selector {" and "selector {" on same line
        # but what if "selector { prop: val; }" on one line?
        # We should split that up?
        # For this task, let's keep it simple. If valid CSS exists, assume one rule per line is preferred?
        # Or just respect existing structure but fix indentation?
        
        # Let's do a rudimentary check for { at end of line
        if stripped.endswith('{'):
            level += 1
        else:
            # Check for inline { ... } which shouldn't change level if closed on same line
            # Count { and }
            open_count = stripped.count('{')
            close_count = stripped.count('}')
            level += (open_count - close_count)
            level = max(0, level)

    return '\n'.join(formatted_lines)

# Better approach for "Make it proper":
# Just ensure that there are no weird artifacts.
# The user might just want me to ensure the file is consistent.
# Current file usage of indentation seems to be 4 spaces.
# I will use a regex-based cleaner to ensure:
# 1. One rule per line for properties (naive)
# 2. Closing braces on their own line.

def simple_clean(content):
    # Remove multiple blank lines
    content = re.sub(r'\n\s*\n', '\n\n', content)
    # Remove trailing whitespace
    content = re.sub(r'[ \t]+$', '', content, flags=re.MULTILINE)
    return content

def main():
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # clean
    new_content = simple_clean(content)
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Formatted style.css (cleaned whitespace).")
    else:
        print("style.css was already clean.")

if __name__ == '__main__':
    main()
