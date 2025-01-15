import requests


def download_image(url, save_path):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful

        with open(save_path, "wb") as file:
            file.write(response.content)
        print(f"Image successfully downloaded: {save_path}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")


# Example usage
image_url = "https://onlinejpgtools.com/images/examples-onlinejpgtools/book-cover.jpg"
save_path = "downloaded_image.jpg"
download_image(image_url, save_path)
