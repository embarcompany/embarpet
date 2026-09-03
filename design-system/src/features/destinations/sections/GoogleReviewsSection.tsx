import { Star } from "lucide-react";
import { AnalysisButton } from "../../../components/ui/buttons";

const googleReviews = [
  { name: "Aline", avatar: "/avatar-01.webp", quote: "Foi tudo perfeito! Toda a equipe foi super paciente e atenciosa com a minha cachorrinha Sophia." },
  { name: "Arthur", avatar: "/avatar-02.webp", quote: "Pude realizar minha viagem internacional com a certeza de que meu cão viajaria em segurança." },
  { name: "João", avatar: "/avatar-03.webp", quote: "Me auxiliaram até mesmo na escolha da melhor caixa de transporte para a viagem." },
  { name: "Cinthia", avatar: "/avatar-04.webp", quote: "Todos os funcionários são extremamente cuidadosos e carinhosos com o meu gatinho." },
  { name: "Kevin", avatar: "/avatar-05.webp", quote: "O carinho e o cuidado que meu pet recebeu em todo o processo foram fantásticos." },
  { name: "Marta", avatar: "/avatar-06.webp", quote: "Deram todo o suporte ao Thor e cuidaram de tudo para a viagem internacional." },
] as const;

function ReviewCard({ review }: { review: (typeof googleReviews)[number] }) {
  return <article className="ep-us-google-reviews__card">
    <div className="ep-us-google-reviews__card-head">
      <img src="/logo-google.svg" alt="Google" />
      <span aria-label="5 de 5 estrelas">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill="currentColor" aria-hidden="true" />)}</span>
    </div>
    <p>“{review.quote}”</p>
    <strong><img src={review.avatar} alt="" /> <span>{review.name}<small>Avaliação no Google</small></span></strong>
  </article>;
}

function ReviewTrack({ reviews, reverse = false }: { reviews: readonly (typeof googleReviews)[number][]; reverse?: boolean }) {
  return <div className="ep-us-google-reviews__viewport">
    <div className={`ep-us-google-reviews__track${reverse ? " is-reverse" : ""}`}>
      <div className="ep-us-google-reviews__set">{reviews.map((review) => <ReviewCard key={review.name} review={review} />)}</div>
      <div className="ep-us-google-reviews__set" aria-hidden="true">{reviews.map((review) => <ReviewCard key={review.name} review={review} />)}</div>
    </div>
  </div>;
}

export function GoogleReviewsSection({ onStartPlanning }: { onStartPlanning: () => void }) {
  return <section className="ep-us-google-reviews" aria-labelledby="google-reviews-title">
    <div className="ep-container ep-us-google-reviews__heading">
      <p className="ep-us-kicker ep-us-google-reviews__trust"><span><img src="/logo-google.svg" alt="Google" /><strong>4,9</strong> avaliação no Google</span></p>
      <h2 id="google-reviews-title">Mais de 400 avaliações <em>positivas.</em></h2>
      <p>Relatos reais de famílias que confiaram a viagem internacional dos seus pets à Embarpet.</p>
    </div>
    <div className="ep-us-google-reviews__tracks" aria-label="Avaliações de clientes no Google">
      <ReviewTrack reviews={googleReviews.slice(0, 3)} />
      <ReviewTrack reviews={googleReviews.slice(3)} reverse />
    </div>
    <div className="ep-us-google-reviews__cta"><AnalysisButton onClick={onStartPlanning}>Quero planejar a viagem do meu pet</AnalysisButton></div>
  </section>;
}
