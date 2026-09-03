import { Star } from "lucide-react";

const googleReviews = [
  { name: "Aline", avatar: "/avatar-01.webp", quote: "Foi tudo perfeito! Toda a equipe foi super paciente e atenciosa com a minha cachorrinha Sophia." },
  { name: "Arthur", avatar: "/avatar-02.webp", quote: "Pude realizar minha viagem internacional com a certeza de que meu cão viajaria em segurança." },
  { name: "João", avatar: "/avatar-03.webp", quote: "Me auxiliaram até mesmo na escolha da melhor caixa de transporte para a viagem." },
  { name: "Cinthia", avatar: "/avatar-04.webp", quote: "Todos os funcionários são extremamente cuidadosos e carinhosos com o meu gatinho." },
  { name: "Kevin", avatar: "/avatar-05.webp", quote: "O carinho e o cuidado que meu pet recebeu em todo o processo foram fantásticos." },
  { name: "Marta", avatar: "/avatar-06.webp", quote: "Deram todo o suporte ao Thor e cuidaram de tudo para a viagem internacional." },
] as const;

const googleReviewsUrl = "https://share.google/iWqT4MZeMjiaZpkiV";

function ReviewCard({ review }: { review: (typeof googleReviews)[number] }) {
  return <a className="ep-us-google-reviews__card" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ler a avaliação de ${review.name} no Google`}>
    <div className="ep-us-google-reviews__card-head">
      <img src="/logo-google.svg" alt="Google" />
      <span aria-label="5 de 5 estrelas">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill="currentColor" aria-hidden="true" />)}</span>
    </div>
    <p>“{review.quote}”</p>
    <strong><img src={review.avatar} alt="" /> <span>{review.name}<small>Avaliação no Google</small></span></strong>
  </a>;
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
      <p className="ep-us-kicker ep-us-google-reviews__trust"><span><img src="/logo-google.svg" alt="Google" /><strong>4,9</strong> avaliação no Google</span></p>
      <h2 id="google-reviews-title">Mais de 400 avaliações <em>positivas.</em></h2>
      <p>Relatos reais de famílias que confiaram a viagem internacional dos seus pets à Embarpet. Clique em um card para conferir o perfil no Google.</p>
    </div>
    <div className="ep-us-google-reviews__tracks" aria-label="Avaliações de clientes no Google">
      <ReviewTrack />
      <ReviewTrack reverse />
    </div>
  </section>;
}
