"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, LocateFixed, MapPin, Route, ShieldCheck } from "lucide-react";
import { cn } from "../../lib/utils";

export interface RideBookingFormProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  city?: string;
  onSearch: (details: { pickup: string; dropoff: string; date: string; time: string }) => void;
}

/**
 * Integração do prompt RideBookingForm.
 * Mantém sua arquitetura: rota conectada, contexto local, data e CTA.
 * A adaptação troca preço imediato por análise individual de viagem do pet.
 */
export const RideBookingForm = React.forwardRef<HTMLDivElement, RideBookingFormProps>(
  ({ className, imageUrl, city = "São Paulo, Brasil", onSearch, ...props }, ref) => {
    const [pickup, setPickup] = React.useState("");
    const [dropoff, setDropoff] = React.useState("");
    const [date, setDate] = React.useState("");

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSearch({ pickup, dropoff, date, time: "planejamento" });
    };

    const container = { hidden:{ opacity:0 }, visible:{ opacity:1, transition:{ staggerChildren:.08, delayChildren:.08 } } };
    const item = { hidden:{ opacity:0, y:14 }, visible:{ opacity:1, y:0, transition:{ duration:.35 } } };

    return <div ref={ref} className={cn("w-full max-w-6xl mx-auto p-4 lg:p-7", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch overflow-hidden rounded-ember border border-embarpets-deep bg-card">
        <motion.div className="p-5 sm:p-8 lg:p-10" variants={container} initial="hidden" whileInView="visible" viewport={{ once:true, amount:.2 }}>
          <motion.p variants={item} className="mb-6 flex items-center gap-2 text-xs font-semibold text-embarpets-muted"><LocateFixed className="h-4 w-4 text-embarpets-deep" />Você parte de {city}? <button type="button" className="font-bold text-embarpets-teal underline underline-offset-4">Alterar cidade</button></motion.p>
          <motion.div variants={item} className="mb-7"><p className="text-xs font-extrabold uppercase tracking-[.15em] text-embarpets-deep">Diagnóstico de viagem</p><h2 className="mt-2 text-4xl font-bold tracking-tight text-embarpets-teal sm:text-5xl">Vamos entender a rota do seu pet.</h2></motion.div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={item} className="relative border border-border bg-muted/50 p-3 sm:p-4">
              <span className="absolute bottom-10 left-7 top-10 border-l border-dashed border-embarpets-deep" aria-hidden="true" />
              <div className="relative flex items-center"><span className="z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-background"><MapPin className="h-4 w-4 text-embarpets-teal" /></span><input required aria-label="Origem" value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="De onde seu pet parte?" className="w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-embarpets-muted" /></div>
              <div className="mx-10 border-t border-border" />
              <div className="relative flex items-center"><span className="z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-background"><Route className="h-4 w-4 text-embarpets-teal" /></span><input required aria-label="Destino" value={dropoff} onChange={(event) => setDropoff(event.target.value)} placeholder="Para onde ele vai?" className="w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-embarpets-muted" /></div>
            </motion.div>
            <motion.div variants={item} className="grid grid-cols-1 gap-3 sm:grid-cols-2"><label className="flex items-center gap-3 border border-border bg-muted/50 px-4 py-3 text-sm text-foreground"><Calendar className="h-5 w-5 text-embarpets-deep" /><select aria-label="Quando pretende viajar?" value={date} onChange={(event) => setDate(event.target.value)} className="w-full bg-transparent outline-none"><option value="">Quando pretende viajar?</option><option>Nos próximos 3 meses</option><option>Entre 3 e 6 meses</option><option>Mais de 6 meses</option><option>Ainda estou planejando</option></select></label><div className="flex items-center gap-3 border border-border bg-muted/50 px-4 py-3 text-xs font-semibold text-embarpets-muted"><ShieldCheck className="h-5 w-5 shrink-0 text-embarpets-deep" />Análise personalizada</div></motion.div>
            <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2"><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-ember bg-primary px-7 text-sm font-extrabold text-primary-foreground hover:bg-primary/90">Continuar análise <span aria-hidden="true">→</span></button><span className="text-xs leading-relaxed text-embarpets-muted">A modalidade depende da rota, do pet e das regras vigentes.</span></motion.div>
          </form>
        </motion.div>
        <motion.div className="hidden min-h-[540px] p-6 lg:block" initial={{ opacity:0, scale:.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:.5 }}><img src={imageUrl} alt="Tutor com pet em contexto de viagem" className="h-full w-full rounded-ember border border-border object-cover" /></motion.div>
      </div>
    </div>;
  },
);
RideBookingForm.displayName = "RideBookingForm";
