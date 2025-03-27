import { cookies } from "next/headers";

/**
 * Cookie helper
 */
export class CookieHelper {
  /**
   * set cookie
   */
  static async set(
    key: string,
    value: string,
    {
      expires = 30 * 24 * 60 * 60,
      path = "/",
    }: {
      expires?: number;
      path?: string;
    }
  ) {
    const cookie = await cookies();
    cookie.set(key, value, {
      httpOnly: true,
      secure: true,
      path: path,
      maxAge: expires,
    });
  }

  /**
   * get cookie
   */
  static async get(key: string) {
    const cookie = await cookies();
    const value = cookie.get(key)?.value;
    return value;
  }

  /**
   * Destroy cookie
   */
  static async destroy(
    key: string,
    {
      path = "/",
    }: {
      path?: string;
    }
  ) {
    const cookie = await cookies();
    cookie.delete(key);
  }
}
