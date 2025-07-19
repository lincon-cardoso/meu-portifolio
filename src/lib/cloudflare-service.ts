/**
 * CLOUDFLARE DNS SERVICE
 * Serviço para automação de DNS via Cloudflare API
 * Funcionalidades: Criar subdomínios, gerenciar registros DNS, SSL automático
 */

interface CloudflareConfig {
  apiToken: string;
  accountId: string;
  zoneId: string; // ID da zona principal (ex: linconcardoso.com)
  baseDomain: string; // Domínio principal (ex: linconcardoso.com)
}

interface DNSRecord {
  id: string;
  type: "CNAME" | "A" | "AAAA" | "TXT" | "MX";
  name: string;
  content: string;
  ttl: number;
  proxied: boolean;
  zone_id: string;
  zone_name: string;
  created_on: string;
  modified_on: string;
}

interface CreateDNSRecordParams {
  type: "CNAME" | "A" | "AAAA" | "TXT" | "MX";
  name: string; // Ex: "projeto1" para criar projeto1.linconcardoso.com
  content: string; // Ex: "projeto-abc123.up.railway.app"
  ttl?: number; // Padrão: 300 (5 minutos)
  proxied?: boolean; // Padrão: true (usar proxy Cloudflare)
  comment?: string;
}

interface SubdomainSetupParams {
  subdomain: string; // Nome do subdomínio (ex: "projeto1")
  railwayUrl: string; // URL do Railway (ex: "projeto-abc123.up.railway.app")
  enableProxy?: boolean; // Usar proxy Cloudflare (SSL, DDoS protection)
  sslMode?: "flexible" | "full" | "strict"; // Modo SSL
}

export class CloudflareService {
  private config: CloudflareConfig;
  private baseUrl = "https://api.cloudflare.com/client/v4";

  constructor(config: CloudflareConfig) {
    this.config = config;
  }

  /**
   * Criar subdomínio completo para projeto
   * Configura DNS + SSL + Proxy automaticamente
   */
  async setupSubdomain(params: SubdomainSetupParams): Promise<DNSRecord> {
    try {
      console.log(
        `🌐 Configurando subdomínio: ${params.subdomain}.${this.config.baseDomain}`
      );

      // 1. Criar registro DNS CNAME
      const dnsRecord = await this.createDNSRecord({
        type: "CNAME",
        name: params.subdomain,
        content: params.railwayUrl,
        proxied: params.enableProxy ?? true,
        ttl: 300, // 5 minutos para mudanças rápidas
        comment: `Auto-generated for project: ${params.subdomain}`,
      });

      console.log("✅ Registro DNS criado:", dnsRecord.name);

      // 2. Configurar SSL se proxy estiver habilitado
      if (params.enableProxy !== false) {
        await this.configureSsl(params.sslMode || "flexible");
        console.log("✅ SSL configurado");
      }

      // 3. Aguardar propagação DNS (opcional)
      console.log("⏳ Aguardando propagação DNS...");
      await this.waitForDnsPropagation(
        `${params.subdomain}.${this.config.baseDomain}`
      );

      console.log(
        `🎉 Subdomínio configurado: https://${params.subdomain}.${this.config.baseDomain}`
      );
      return dnsRecord;
    } catch (error) {
      console.error("❌ Erro ao configurar subdomínio:", error);
      throw new Error(
        `Falha ao configurar subdomínio: ${error instanceof Error ? error.message : "Erro desconhecido"}`
      );
    }
  }

  /**
   * Criar registro DNS
   */
  async createDNSRecord(params: CreateDNSRecordParams): Promise<DNSRecord> {
    try {
      const url = `${this.baseUrl}/zones/${this.config.zoneId}/dns_records`;

      const payload = {
        type: params.type,
        name: params.name,
        content: params.content,
        ttl: params.ttl || 300,
        proxied: params.proxied ?? true,
        comment:
          params.comment ||
          `Created via automation at ${new Date().toISOString()}`,
      };

      const response = await this.makeRequest("POST", url, payload);

      if (!response.success) {
        throw new Error(
          `Cloudflare API error: ${JSON.stringify(response.errors)}`
        );
      }

      return response.result as DNSRecord;
    } catch (error) {
      console.error("❌ Erro ao criar registro DNS:", error);
      throw error;
    }
  }

  /**
   * Atualizar registro DNS existente
   */
  async updateDNSRecord(
    recordId: string,
    params: Partial<CreateDNSRecordParams>
  ): Promise<DNSRecord> {
    try {
      const url = `${this.baseUrl}/zones/${this.config.zoneId}/dns_records/${recordId}`;

      const response = await this.makeRequest("PATCH", url, params);

      if (!response.success) {
        throw new Error(
          `Cloudflare API error: ${JSON.stringify(response.errors)}`
        );
      }

      return response.result as DNSRecord;
    } catch (error) {
      console.error("❌ Erro ao atualizar registro DNS:", error);
      throw error;
    }
  }

  /**
   * Deletar registro DNS
   */
  async deleteDNSRecord(recordId: string): Promise<boolean> {
    try {
      const url = `${this.baseUrl}/zones/${this.config.zoneId}/dns_records/${recordId}`;

      const response = await this.makeRequest("DELETE", url);

      return response.success;
    } catch (error) {
      console.error("❌ Erro ao deletar registro DNS:", error);
      throw error;
    }
  }

  /**
   * Buscar registros DNS por nome
   */
  async findDNSRecord(name: string): Promise<DNSRecord | null> {
    try {
      const url = `${this.baseUrl}/zones/${this.config.zoneId}/dns_records?name=${encodeURIComponent(name)}`;

      const response = await this.makeRequest("GET", url);

      if (!response.success || (response.result as DNSRecord[]).length === 0) {
        return null;
      }

      return (response.result as DNSRecord[])[0];
    } catch (error) {
      console.error("❌ Erro ao buscar registro DNS:", error);
      return null;
    }
  }

  /**
   * Listar todos os registros DNS
   */
  async listDNSRecords(type?: string): Promise<DNSRecord[]> {
    try {
      let url = `${this.baseUrl}/zones/${this.config.zoneId}/dns_records`;

      if (type) {
        url += `?type=${type}`;
      }

      const response = await this.makeRequest("GET", url);

      if (!response.success) {
        throw new Error(
          `Cloudflare API error: ${JSON.stringify(response.errors)}`
        );
      }

      return response.result as DNSRecord[];
    } catch (error) {
      console.error("❌ Erro ao listar registros DNS:", error);
      throw error;
    }
  }

  /**
   * Configurar SSL para a zona
   */
  private async configureSsl(
    mode: "flexible" | "full" | "strict" = "flexible"
  ): Promise<void> {
    try {
      const url = `${this.baseUrl}/zones/${this.config.zoneId}/settings/ssl`;

      await this.makeRequest("PATCH", url, {
        value: mode,
      });

      // Ativar SSL universal se não estiver ativo
      await this.makeRequest(
        "PATCH",
        `${this.baseUrl}/zones/${this.config.zoneId}/settings/universal_ssl`,
        {
          value: "on",
        }
      );
    } catch (error) {
      console.error("❌ Erro ao configurar SSL:", error);
      // Não falhar o processo por SSL, apenas logar
    }
  }

  /**
   * Aguardar propagação DNS
   */
  private async waitForDnsPropagation(
    domain: string,
    maxAttempts = 10
  ): Promise<boolean> {
    try {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`🔍 Verificando DNS - Tentativa ${attempt}/${maxAttempts}`);

        try {
          // Simular verificação DNS com timeout
          const response = await fetch(
            `https://1.1.1.1/dns-query?name=${domain}&type=CNAME`,
            {
              method: "GET",
              headers: {
                Accept: "application/dns-json",
              },
              signal: AbortSignal.timeout(5000), // 5 segundos timeout
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.Answer && data.Answer.length > 0) {
              console.log("✅ DNS propagado com sucesso");
              return true;
            }
          }
        } catch {
          console.log(`⏳ DNS ainda propagando... (${attempt}/${maxAttempts})`);
        }

        // Aguardar 3 segundos antes da próxima tentativa
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }

      console.log(
        "⚠️ DNS pode não ter propagado completamente, continuando..."
      );
      return false;
    } catch (error) {
      console.error("❌ Erro ao verificar propagação DNS:", error);
      return false;
    }
  }

  /**
   * Verificar se subdomínio já existe
   */
  async subdomainExists(subdomain: string): Promise<boolean> {
    try {
      const fullDomain = `${subdomain}.${this.config.baseDomain}`;
      const record = await this.findDNSRecord(fullDomain);
      return record !== null;
    } catch (error) {
      console.error("❌ Erro ao verificar subdomínio:", error);
      return false;
    }
  }

  /**
   * Gerar subdomínio único se necessário
   */
  async generateUniqueSubdomain(baseName: string): Promise<string> {
    try {
      let subdomain = baseName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      let counter = 1;

      while (await this.subdomainExists(subdomain)) {
        subdomain = `${baseName}-${counter}`;
        counter++;

        if (counter > 999) {
          throw new Error("Não foi possível gerar subdomínio único");
        }
      }

      return subdomain;
    } catch (error) {
      console.error("❌ Erro ao gerar subdomínio único:", error);
      throw error;
    }
  }

  /**
   * Fazer requisição para Cloudflare API
   */
  private async makeRequest(
    method: string,
    url: string,
    data?: unknown
  ): Promise<{
    success: boolean;
    result: unknown;
    errors?: unknown[];
    messages?: unknown[];
  }> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          Authorization: `Bearer ${this.config.apiToken}`,
          "Content-Type": "application/json",
        },
      };

      if (data && method !== "GET") {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("❌ Erro na requisição Cloudflare:", error);
      throw error;
    }
  }
}

/**
 * Instância singleton do serviço Cloudflare
 */
export const cloudflareService = new CloudflareService({
  apiToken: process.env.CLOUDFLARE_API_TOKEN || "",
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
  zoneId: process.env.CLOUDFLARE_ZONE_ID || "",
  baseDomain: process.env.CLOUDFLARE_BASE_DOMAIN || "linconcardoso.com",
});
