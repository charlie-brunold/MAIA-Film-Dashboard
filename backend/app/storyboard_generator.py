"""
storyboard_generator.py
Generate up to 5 DALL·E images for a film/story prompt.

Prerequisites (run once in the VS Code terminal):
    python -m pip install --upgrade openai python-dotenv
Create a .env file in the same folder with:
    OPENAI_API_KEY=sk-...YOUR_KEY...
"""

from dotenv import load_dotenv          # reads .env
import os
from openai import OpenAI               # OpenAI ≥ 1.0 client

# -----------------------------------------------------------
# helper: ask repeatedly until a valid integer in [min, max]
# -----------------------------------------------------------
def get_int_in_range(prompt_text: str, minimum: int, maximum: int) -> int:
    while True:
        try:
            value = int(input(prompt_text))
            if minimum <= value <= maximum:
                return value
            print(f"Please enter a number between {minimum} and {maximum}.")
        except ValueError:
            print("Please enter a whole number.")

# -----------------------------------------------------------
def main() -> None:
    # 1. load environment variables (including OPENAI_API_KEY)
    load_dotenv()

    # 2. create an authenticated client (uses the env‑var automatically)
    client = OpenAI()

    # 3. collect user input
    story_prompt = input("Enter your film/story idea prompt:\n> ")
    num_images   = get_int_in_range("How many images? (1‑5)\n> ", 1, 5)

    print(f"\nGenerating {num_images} image(s)… please wait.\n")

    # 4. call the Images API
    try:
        response = client.images.generate(
            model="dall-e-3",           # omit or change if you like
            prompt=story_prompt,
            n=num_images,
            size="1024x1024"
        )

        # 5. show the returned URLs
        print("Image URLs:")
        for i, img in enumerate(response.data, 1):
            print(f"{i}. {img.url}")

    except Exception as err:
        print("Something went wrong:", err)

# -----------------------------------------------------------
if __name__ == "__main__":
    main()