import { Star } from "lucide-react";

const googleReviews = [
  { name: "Aline", quote: "Foi tudo perfeito! Toda a equipe foi super paciente e atenciosa com a minha cachorrinha Sophia." },
  { name: "Arthur", quote: "Pude realizar minha viagem internacional com a certeza de que meu cão viajaria em segurança." },
  { name: "João", quote: "Me auxiliaram até mesmo na escolha da melhor caixa de transporte para a viagem." },
  { name: "Cinthia", quote: "Todos foram extremamente cuidadosos e carinhosos com o meu gatinho." },
  { name: "Kevin", quote: "O carinho e o cuidado que meu pet recebeu em todo o processo foram fantásticos." },
  { name: "Marta", quote: "Deram todo o suporte ao Thor e cuidaram de tudo para a viagem internacional." },
] as const;

function ReviewCard({ review }: { review: (typeof googleReviews)[number] }) {
  return <article className="ep-us-google-reviews__card">
    <div className="ep-us-google-reviews__card-head">
      <img src="/logo-google.svg" alt="Google" />
      <span aria-label="5 de 5 estrelas">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill="currentColor" aria-hidden="true" />)}</span>
    </div>
    <p>“{review.quote}”</p>
    <strong>{review.name}<small>Avaliação no Google</small></strong>
  </article>;
}

function ReviewTrack({ reverse = false }: { reverse?: boolean }) {
  return <div className="ep-us-google-reviews__viewport">
    <div className={`ep-us-google-reviews__track${reverse ? " is-reverse" : ""}`}>
      <div className="ep-us-google-reviews__set">{googleReviews.map((review) => <ReviewCard key={review.name} review={review} />)}</div>
      <div className="ep-us-google-reviews__set" aria-hidden="true">{googleReviews.map((review) => <ReviewCard key={review.name} review={review} />)}</div>
    </div>
  </div>;
}

export function GoogleReviewsSection() {
  return <section className="ep-us-google-reviews" aria-labelledby="google-reviews-title">
    <div className="ep-container ep-us-google-reviews__heading">
      <p className="ep-us-kicker"><img src="/logo-google.svg" alt="Google" /> Avaliações reais</p>
      <h2 id="google-reviews-title">Quem já viveu a jornada, <em>recomenda.</em></h2>
      <p>Relatos de famílias que confiaram a viagem internacional dos seus pets à Embarpet.</p>
    </div>
    <div className="ep-us-google-reviews__tracks" aria-label="Avaliações de clientes no Google">
      <ReviewTrack />
      <ReviewTrack reverse />
    </div>
  </section>;
}
