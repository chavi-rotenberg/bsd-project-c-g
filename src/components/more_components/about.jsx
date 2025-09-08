import React, { useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Divider, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  IconButton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './about.css';

export const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const features = [
    {
      icon: <EventNoteIcon fontSize="large" />,
      title: 'ניהול אירועים',
      description: 'ניהול קל ונוח של כל האירועים שלך במקום אחד. הוספה, עריכה ומעקב אחר סטטוס האירועים.'
    },
    {
      icon: <ReceiptIcon fontSize="large" />,
      title: 'הפקת קבלות וחשבוניות',
      description: 'הפקת קבלות וחשבוניות דיגיטליות בקלות ובמהירות, שמירה והפצה ללקוחות.'
    },
    {
      icon: <CalendarMonthIcon fontSize="large" />,
      title: 'יומן אירועים',
      description: 'יומן אירועים אינטראקטיבי המאפשר תצוגה יומית, שבועית וחודשית של כל האירועים המתוכננים.'
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      title: 'דוחות וניתוח נתונים',
      description: 'הפקת דוחות מפורטים וניתוח נתונים לקבלת תובנות עסקיות חשובות לצמיחה והתפתחות.'
    }
  ];

  return (
    <Box className="about-page">
      <div className="animated-bg"></div>
      
      <Box className="about-header">
        <Container maxWidth="lg">
          <Box className="about-nav">
            <IconButton 
              className="back-button" 
              onClick={() => navigate('/login')}
              aria-label="חזרה"
            >
              <ArrowBackIcon />
            </IconButton>
            <div className="new-hebrew-logo-5">
              <div className="new-logo-circle">
                <span className="new-logo-text-circle">הצלחה</span>
              </div>
            </div>
          </Box>
          
          <Box className="about-hero" data-aos="fade-up">
            <Typography variant="h2" className="about-title">
              המשרד הדיגיטלי המושלם למפיקות ומרצות
            </Typography>
            <Typography variant="h6" className="about-subtitle">
              פלטפורמה מקצועית לניהול אירועים, הרצאות וסדנאות בצורה חכמה ויעילה
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              className="about-cta-button"
              onClick={() => navigate('/login')}
            >
              התחילי עכשיו
            </Button>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" className="about-content">
        <Box className="about-section" data-aos="fade-up">
          <Typography variant="h4" className="section-title">
            מה אנחנו מציעים
          </Typography>
          <Typography variant="body1" className="section-description">
            פלטפורמה מקיפה המספקת את כל הכלים הדרושים לניהול העסק שלך
          </Typography>
          
          <Grid container spacing={4} className="features-grid">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <Card className="feature-card">
                  <Box className="feature-icon">
                    {feature.icon}
                  </Box>
                  <CardContent>
                    <Typography variant="h6" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="feature-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box className="about-section" data-aos="fade-up">
          <Typography variant="h4" className="section-title">
            למה לבחור בנו
          </Typography>
          
          <Grid container spacing={4} alignItems="center" className="why-us-container">
            <Grid item xs={12} md={6} data-aos="fade-right">
              <Box className="why-us-content">
                <Typography variant="h5" className="why-us-title">
                  פתרון מקיף לכל צרכי הניהול שלך
                </Typography>
                <Typography variant="body1" className="why-us-description">
                  המערכת שלנו מציעה פתרון כולל לניהול העסק שלך, החל מתיאום אירועים ועד להפקת דוחות וחשבוניות. אנו מאמינים שניהול עסק צריך להיות פשוט ויעיל, ולכן פיתחנו מערכת אינטואיטיבית שתחסוך לך זמן ומאמץ.
                </Typography>
                <Box className="why-us-points">
                  <Typography variant="body1" className="why-us-point">
                    <span className="check-icon">✓</span> ממשק ידידותי ונוח לשימוש
                  </Typography>
                  <Typography variant="body1" className="why-us-point">
                    <span className="check-icon">✓</span> גישה מכל מקום בכל זמן
                  </Typography>
                  <Typography variant="body1" className="why-us-point">
                    <span className="check-icon">✓</span> אבטחת מידע ברמה הגבוהה ביותר
                  </Typography>
                  <Typography variant="body1" className="why-us-point">
                    <span className="check-icon">✓</span> תמיכה טכנית זמינה 24/7
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left">
              <Box className="why-us-image-container">
                <img 
                  src={process.env.PUBLIC_URL + "/start.jpg"} 
                  alt="Professional woman working on laptop" 
                  className="why-us-image"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Box className="about-section testimonials-section" data-aos="fade-up">
          <Typography variant="h4" className="section-title">
            מה לקוחותינו אומרים
          </Typography>
          
          <div className="testimonial-slider">
            <Grid container spacing={4}>
              {[
                {
                  text: "המערכת שינתה לחלוטין את האופן שבו אני מנהלת את העסק שלי. היא חסכה לי שעות של עבודה אדמיניסטרטיבית ואפשרה לי להתמקד במה שאני אוהבת - להרצות ולהעביר סדנאות.",
                  name: "מיכל לוי",
                  title: "מרצה ומנחת סדנאות"
                },
                {
                  text: "הפקת חשבוניות וקבלות הייתה תמיד כאב ראש גדול עבורי. עכשיו, בלחיצת כפתור, אני יכולה להפיק מסמכים מקצועיים ולשלוח אותם ישירות ללקוחות שלי. פשוט מדהים!",
                  name: "רונית כהן",
                  title: "מפיקת אירועים"
                },
                {
                  text: "היומן האינטראקטיבי הוא כלי מדהים! אני יכולה לראות בקלות את כל האירועים המתוכננים שלי, לערוך שינויים בלוח הזמינו ולקבל תזכורות חשובות. זה עזר לי להיות הרבה יותר מאורגנת.",
                  name: "דנה ישראלי",
                  title: "מדריכת טיולים"
                }
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index} data-aos="flip-up" data-aos-delay={index * 100}>
                  <Paper className="testimonial-card">
                    <div className="quote-icon">"</div>
                    <Typography variant="body1" className="testimonial-text">
                      {testimonial.text}
                    </Typography>
                    <Box className="testimonial-author">
                      <Typography variant="subtitle1" className="author-name">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" className="author-title">
                        {testimonial.title}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>

        <Box className="about-section cta-section" data-aos="zoom-in">
          <Paper className="cta-container">
            <Typography variant="h4" className="cta-title">
              מוכנה להתחיל?
            </Typography>
            <Typography variant="body1" className="cta-description">
              הצטרפי לאלפי מפיקות ומרצות שכבר נהנו מהיתרונות של המערכת שלנו
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              className="cta-button"
              onClick={() => navigate('/login')}
            >
              הירשמי עכשיו - חודש ראשון חינם
            </Button>
          </Paper>
        </Box>
      </Container>
      
      <Box className="about-footer">
        <Container maxWidth="lg">
          <Box className="footer-content">
            <Box className="footer-logo">
              <div className="custom-logo footer-logo-style">
                <span className="logo-text">Pro</span>
                <span className="logo-text accent">Event</span>
              </div>
              <Typography variant="body2" className="footer-tagline">
                המשרד הדיגיטלי המושלם למפיקות ומרצות
              </Typography>
            </Box>
            
            <Box className="footer-cta">
              <Typography variant="h6" className="cta-text">
                מוכנה להתחיל?
              </Typography>
              <Button 
                variant="contained" 
                className="cta-button"
                onClick={() => navigate('/login')}
              >
                הירשמי עכשיו
              </Button>
            </Box>
          </Box>
          
          <Divider className="footer-divider" />
          
          <Typography variant="body2" className="copyright-text">
            © {new Date().getFullYear()} ProEvent. כל הזכויות שמורות.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
