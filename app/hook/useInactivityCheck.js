const useInactivityTracker = (inactivityTimeout = 5000) => {
  // 5 seconds in milliseconds
  const [isInactive, setIsInactive] = useState(false);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      const now = Date.now();
      if (now - lastInteractionRef.current >= inactivityTimeout) {
        setIsInactive(true);
      }
    }, 1000); // Check every second

    return () => clearInterval(inactivityTimer);
  }, [inactivityTimeout]);

  const panResponder = useRef(
    PanResponder.create({
      // ... PanResponder configuration
    })
  ).current;

  const handleInteraction = () => {
    lastInteractionRef.current = Date.now();
    setIsInactive(false);
  };

  // Attach interaction events to panResponder handlers
  Object.entries(panResponder.panHandlers).forEach(([eventName, handler]) => {
    document.addEventListener(eventName, handleInteraction);
  });

  // Additional event listeners for interaction (e.g., touch events)
  // ...

  return { isInactive, panHandlers: panResponder.panHandlers };
};
