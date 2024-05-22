from django.db import models

# Create your models here.
class News_Article(models.Model) :
    article_id = models.AutoField
    article_name = models.CharField(max_length =50)
    article_heading = models.CharField( max_length=400)
    article_headlines1 = models.CharField( max_length=400)
    article_headlines2 = models.CharField( max_length=400)
    article_headlines3 = models.CharField( max_length=400)
    article_desc = models.TextField()
    article_pub_date = models.DateField()
    article_category = models.CharField(max_length=50,default="")
    article_subcategory = models.CharField(max_length = 50, default = "")
    article_published_by = models.CharField( max_length=150)
    article_main_image = models.ImageField(upload_to="news/images",default="")
    article_image1 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image2 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image3 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image4 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image5 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_main_video = models.FileField( upload_to="news/videos" ,default="",null=True, blank=True)
    article_image_casereport1 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport2 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport3 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport4 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport5 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport6 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport7 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport8 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport9 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport10 = models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_image_casereport11= models.ImageField(upload_to="news/images",default="",null=True, blank=True)
    article_report_video1 = models.FileField( upload_to="news/videos",default="",null=True, blank=True)
    article_report_video2 = models.FileField( upload_to="news/videos",default="",null=True, blank=True)
    article_report_video3 = models.FileField( upload_to="news/videos",default="",null=True, blank=True)
    article_report_video4 = models.FileField( upload_to="news/videos",default="",null=True, blank=True)
    article_report_video5 = models.FileField( upload_to="news/videos",default="",null=True, blank=True)

    def __str__(self) -> str:
        return self.article_name