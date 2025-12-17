import type { APIRoute } from "astro";
import pako from "pako";

export const prerender = false;

export const POST: APIRoute = async ({ request, params }) => {
  // const body = await request.json();
  const data = await request.formData();
  
  const res = await fetch("https://trangkeo.com/keo/keonhacai/ajax_tyle.php", {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="140", "Not=A?Brand";v="24", "Microsoft Edge";v="140"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://trangkeo.com/keo/",
    body: data,
    method: "POST",
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json()).then((result) => {
    if (result.gzip) {
				const strData = atob(result.gzip);
				const charData = strData.split("").map((x) => x.charCodeAt(0));
				const binData = new Uint8Array(charData);
				result.html = pako.inflate(binData, {
					to: "string",
				});

        return result
			}

      return new Response(result);
  });

  return new Response(res);
};
