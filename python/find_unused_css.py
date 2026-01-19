import re
import os

css_file_path = r'd:\Github\BTI-TEX\CSS\style.css'
project_root = r'd:\Github\BTI-TEX'

def get_selectors(css_content):
    # This regex attempts to find class and id selectors.
    # It simplifies by looking for .name or #name followed by { or , or :
    # It catches .class-name, #id-name.
    # We strip pseudo-classes and whitespace.
    
    # Regex explanation:
    # ([.#][\w-]+) matches .class or #id
    # We look for them before a { to ensure it's a rule definition
    
    # A cleaner approach for simple parsing:
    # 1. Remove comments
    content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    
    selectors = set()
    
    # Simple parser: Split by '}' to get blocks, then take the part before '{'
    blocks = content.split('}')
    for block in blocks:
        if '{' in block:
            selector_part = block.split('{')[0]
            # Split by comma for multiple selectors
            parts = selector_part.split(',')
            for part in parts:
                part = part.strip()
                # Find all .class and #id in this part
                matches = re.findall(r'([.#][a-zA-Z0-9_-]+)', part)
                for m in matches:
                    # Ignore pseudo elements/classes in the name itself if regex caught them (basic regex doesn't, but good to be safe)
                    clean_m = m.split(':')[0] 
                    if len(clean_m) > 1: # avoid single . or #
                        selectors.add(clean_m)
    return selectors

def get_files_content(root_dir):
    contents = ""
    for root, dirs, files in os.walk(root_dir):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html') or file.endswith('.js'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        contents += f.read() + "\n"
                except Exception as e:
                    print(f"Error reading {path}: {e}")
    return contents

def string_in_content(selector, content):
    # selector is .name or #name
    name = selector[1:] # remove . or #
    
    # We search for the name. 
    # To be safe, we might want boundary checks, but partial matches can be tricky.
    # e.g. class="foo bar" matches 'foo'.
    # Simply searching for the string 'name' is a good first heuristic.
    # If we want to be stricter: search for class=".*name.*" or id="name"
    # But for a quick cleanup tool, simple substring is safer (less false positives for "unused", more false negatives)
    # i.e. if we find "name" anywhere, we assume it's used.
    
    return name in content

def main():
    try:
        with open(css_file_path, 'r', encoding='utf-8') as f:
            css_content = f.read()
    except FileNotFoundError:
        print(f"CSS file not found at {css_file_path}")
        return

    selectors = get_selectors(css_content)
    print(f"Found {len(selectors)} unique selectors in style.css")
    
    content = get_files_content(project_root)
    print(f"Scanned project content size: {len(content)} chars")
    
    unused = []
    for sel in selectors:
        if not string_in_content(sel, content):
            unused.append(sel)
    
    print(f"Found {len(unused)} potentially unused selectors.")
    print("--- Unused Selectors ---")
    for u in sorted(unused):
        print(u)

if __name__ == '__main__':
    main()
