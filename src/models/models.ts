export interface Usuario {
        id?: number;
        created_at?: string;
        updated_at?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        telephone?: string;
}

export interface Reminder{
        id?:number;
        title: string;
        description?: string;
        reminder_date?:Date;
        notification_time?: Date;
        status: string;
        usuario_id:number;
        created_at?: string;
}

export enum ESTADOS {
        PENDING = 'pending',       // Pendiente
        NOTIFIED = 'notified',     // Notificado
        COMPLETED = 'completed',   // Completado
        EXPIRED = 'expired',       // Expirado
        CANCELED = 'canceled',     // Cancelado
        FAILED = 'failed'          // Fallido
}  
