// /api/logout
// POST
import cookie from "cookie";
export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access_token", "", {
      httpOnly: true,
      secure: false, // prod make it true https secure
      expires: new Date(0), //12hrs
      sameSite: "strict",
      path: "/", //everywhere
    })
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("admin_access_token", "", {
      httpOnly: true,
      secure: false, // prod make it true https secure
      expires: new Date(0), //12hrs
      sameSite: "strict",
      path: "/", //everywhere
    })
  );
  res.send(200).json("cookie deleted");
}
