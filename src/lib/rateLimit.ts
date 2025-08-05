type RateLimitOptions = {
  windowMs: number; // Janela de tempo em milissegundos
  max: number; // Número máximo de tentativas permitidas
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
};

const attempts = new Map<string, { count: number; expires: number }>();

export default function rateLimit(options: RateLimitOptions) {
  return {
    check: async (request: Request): Promise<RateLimitResult> => {
      const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
      const now = Date.now();

      if (!attempts.has(ip)) {
        attempts.set(ip, { count: 1, expires: now + options.windowMs });
        return { success: true, remaining: options.max - 1 };
      }

      const attempt = attempts.get(ip)!;

      if (now > attempt.expires) {
        attempts.set(ip, { count: 1, expires: now + options.windowMs });
        return { success: true, remaining: options.max - 1 };
      }

      if (attempt.count >= options.max) {
        return { success: false, remaining: 0 };
      }

      attempt.count += 1;
      return { success: true, remaining: options.max - attempt.count };
    },
  };
}
