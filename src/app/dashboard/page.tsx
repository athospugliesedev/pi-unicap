"use client"
import Card from "@/app/components/Card";
import Text from "@/app/components/Text";
import formatarDataHora from "@/app/utils/Date";
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from "@/contexts/UserProvider";
import Button from '@mui/material/Button';
import FeedbackModal from '../components/FeedbackModal';
import MultiStepForm from "../components/MultiStepForm";

const titles = [
  "1.0 Qual matéria",
  "1.1 Foi assídua e pontual.",
  "1.2 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.3 Promoveu a integração da teoria com a prática.",
  "1.4 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.5 Demonstrou clareza na exposição do conteúdo das disciplinas.",
  "1.6 Utilizou metodologias inovadoras ativas.",
  "1.7 Utilizou recursos adequados ao ensino das disciplinas.",
  "1.8 Apresentou avaliações coerentes com os conteúdos ministrados.",
  "1.9 Apresentou um bom relacionamento com a turma e proporcionou um clima de respeito mútuo e ético.",
];

const questions = [
  "1.0 Qual matéria",
  "1.1 Foi assídua e pontual.",
  "1.2 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.3 Promoveu a integração da teoria com a prática.",
  "1.4 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.5 Demonstrou clareza na exposição do conteúdo das disciplinas.",
  "1.6 Utilizou metodologias inovadoras ativas.",
  "1.7 Utilizou recursos adequados ao ensino das disciplinas.",
  "1.8 Apresentou avaliações coerentes com os conteúdos ministrados.",
  "1.9 Apresentou um bom relacionamento com a turma e proporcionou um clima de respeito mútuo e ético.",
];


const courses = ['Course A', 'Course B', 'Course C'];
interface Subject {
  id: number;
  name: string;
  rating: number;
  userId: string;
}

interface UserData {
  id: string;
  name: string | null;
  email: string;
  password: string;
  subjects: Subject[];
}

// Dashboard component
export default function Dashboard() {
  // State variables
  const { userId } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentModal, setCurrentModal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<
    { course: string; rating: string; title: string }[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Function to open the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to submit feedback
  const handleSubmitFeedback = (course: string, rating: string) => {
    setFeedbackData((prevData) => [
      ...prevData,
      { course, rating, title: titles[currentModal] },
    ]);

    if (currentModal < titles.length - 1) {
      setCurrentModal(currentModal + 1);
    } else {
      setModalOpen(false);
    }
  };

  // Fetch user data effect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Format current date
  const dataAtual = new Date();
  const dataFormatada = formatarDataHora(dataAtual);

  // JSX structure
  return (
    <>
      <Head>
        <title>Sistema de Avaliação • UNICAP</title>
      </Head>
      <div className="mb-8">
        <Text size="2xl" weight="semibold" fontFamily="sans" color="black">
          {userData?.name || 'Usuário'}
        </Text>
        <Text size="xl" weight="normal" fontFamily="sans" color="black">
          {dataFormatada}
        </Text>
      </div>

      <div className="flex flex-col">
        {userData?.subjects.map((subject) => (
          <Link key={subject.id} href={`/avalie/${subject.name}`}>
            <Card
              key={subject.id}
              title={subject.name}
            />
          </Link>
        ))}
      </div>

      <div>
        <Button className='bg-default hover:bg-default/90 text-white' onClick={handleOpenModal}>Nova avaliação</Button>
        <FeedbackModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFeedback}
        title="Título do Modal"
        courses={['Lógica de Programação', 'Inglês aplicado à informática', 'Fundamentos da computação', 'Introdução à Programação para Web', 'Projeto Integrador I']} 
      />
      </div>
    </>
  );
}