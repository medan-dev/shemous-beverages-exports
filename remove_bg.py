import sys
import subprocess

try:
    from PIL import Image
    import numpy as np
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "numpy"])
    from PIL import Image
    import numpy as np

def remove_black(img_path, out_path):
    print(f"Processing {img_path}...")
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img).astype(float)
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    alpha = np.maximum(np.maximum(r, g), b)
    
    new_data = np.zeros_like(data)
    
    mask = alpha > 0
    new_data[:,:,0][mask] = np.clip(r[mask] * 255.0 / alpha[mask], 0, 255)
    new_data[:,:,1][mask] = np.clip(g[mask] * 255.0 / alpha[mask], 0, 255)
    new_data[:,:,2][mask] = np.clip(b[mask] * 255.0 / alpha[mask], 0, 255)
    new_data[:,:,3] = alpha
    
    new_img = Image.fromarray(new_data.astype(np.uint8), "RGBA")
    new_img.save(out_path)
    print(f"Saved transparent image to {out_path}")

if __name__ == "__main__":
    remove_black("public/images/shemous_logo_master.png", "public/images/shemous_logo_master_transparent.png")
